/**
 * Bulk updates vRealize Automation composite blueprint deployment values and 
 * component maximum cluster values using the REST API.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCACCAFE:VcacHost} cafeHostHandle - The vRA CAFE host object.
 * @param {number} [targetComponentMax] - The new maximum value for component clusters (default 1).
 * @param {number} [targetDeploymentInstances] - The new maximum number of instances for the blueprint (default 10).
 * @returns {void}
 */

var finalComponentMax = targetComponentMax || 1;
var finalDeploymentInstances = targetDeploymentInstances || 10;
 
// Configure REST client targeting composition API
var compositionApiEndpoint = "com.vmware.csp.component.cafe.composition.api";
var cafeRestClient = cafeHostHandle.createRestClient(compositionApiEndpoint);
var blueprintsResourcePath = "blueprints";
 
System.log("Fetching blueprints from vRA composition API...");
var blueprintsResponse = cafeRestClient.get(blueprintsResourcePath);
var rawBodyText = blueprintsResponse.getBodyAsString();
 
if (!rawBodyText) {
    System.warn("Failed to retrieve blueprints collection. Empty response.");
    return null;
}

// Sanitize and parse JSON response
var blueprintsCollectionJson = JSON.parse(rawBodyText.replace(/\\/g, '').replace(/[\t\r\n]/g, ''));
var blueprintsList = blueprintsCollectionJson.content || [];

System.log("Discovered " + blueprintsList.length + " blueprint(s). Initiating mass update.");

var i;
for (i = 0; i < blueprintsList.length; i++) {
    var blueprintSummary = blueprintsList[i];
    var blueprintId = blueprintSummary.id;
    var blueprintName = blueprintSummary.name;
    var blueprintDetailUrl = "blueprints/" + blueprintId;

    System.log("--- Updating Blueprint: " + blueprintName + " (ID: " + blueprintId + ") ---");

    // Fetch granular blueprint definition
    var detailResponse = cafeRestClient.get(blueprintDetailUrl);
    var detailRawBody = detailResponse.getBodyAsString();

    var blueprintDetailsJson;
    try {
        blueprintDetailsJson = JSON.parse(detailRawBody.replace(/\\/g, '').replace(/[\t\r\n]/g, ''));
    } catch (parseEx) {
        System.error("JSON Parse Error for Blueprint '" + blueprintName + "': " + parseEx);
        continue;
    }

    // Process and update component clusters
    var componentsMap = blueprintDetailsJson.components;
    if (componentsMap) {
        var componentKeysList = Object.keys(componentsMap);
        var j;
        for (j = 0; j < componentKeysList.length; j++) {
            var componentIdKey = componentKeysList[j];
            var componentObj = componentsMap[componentIdKey];
            
            if (componentObj.data && componentObj.data._cluster) {
                var currentMin = componentObj.data._cluster.facets.minValue.value.value;
                System.debug("Updating component [" + componentIdKey + "] max cluster size to: " + finalComponentMax + " (Current Min: " + currentMin + ")");
                
                // Re-assign maximum value constraint
                componentObj.data._cluster.facets.maxValue.value.value = finalComponentMax;
            }
        }
    }

    // Update global deployment instance count if applicable
    if (blueprintDetailsJson.properties && blueprintDetailsJson.properties._number_of_instances) {
        var currentMaxInstances = blueprintDetailsJson.properties._number_of_instances.facets.maxValue.value.value;
        System.log("Updating global max instances from " + currentMaxInstances + " to " + finalDeploymentInstances);
        blueprintDetailsJson.properties._number_of_instances.facets.maxValue.value.value = finalDeploymentInstances;
    }

    // Commit updates back to vRA
    var payloadStr = JSON.stringify(blueprintDetailsJson);
    System.log("Pushing updates to " + blueprintDetailUrl);
    cafeRestClient.put(blueprintDetailUrl, payloadStr);
}

System.log("Blueprint reconfiguration batch completed.");

return null;
