/**
 * Bulk updates vRealize Automation composite blueprint deployment values and 
 * component maximum cluster values using the REST API.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCACCAFE:VcacHost} vcacCafeHost The vRA CAFE host object.
 * @param {number} componentMaxValue The new maximum value for component clusters.
 * @param {number} deploymentNumberOfInstances The new maximum number of instances for the blueprint.
 * @returns {void}
 */

// Set defaults if not provided (internal variables in the original snippet)
var componentMaxValue = componentMaxValue || 1;
var deploymentNumberOfInstances = deploymentNumberOfInstances || 10;
 
// create rest endpoint for rest client
var endpoint = "com.vmware.csp.component.cafe.composition.api";
var restClient = vcacCafeHost.createRestClient(endpoint);
var blueprintsUrl = "blueprints";
 
// get blueprints
var blueprints = restClient.get(blueprintsUrl);
var res = blueprints.getBodyAsString();
 
// clean json and parse
var json = JSON.parse(res.replace(/\\/g, '').replace('\t', '').replace('\r', '').replace('\n', ''));
 
// get all blueprints - match on name
for each (var blueprint in json.content) {
    System.log("Blueprint name: " + blueprint.name);
    var blueprintSpecificUrl = "blueprints/" + blueprint.id;
    System.log("URL for blueprint: " + blueprintSpecificUrl);
 
    // get individual blueprint details
    var bpDetailsResponse = restClient.get(blueprintSpecificUrl);
    var bpRes = bpDetailsResponse.getBodyAsString();
 
    var bpJson;
    try {
        // clean json and parse
        bpJson = JSON.parse(bpRes.replace(/\\/g, '').replace('\t', '').replace('\r', '').replace('\n', ''));
    } catch (e) {
        System.log(e + ": Could not parse JSON payload for " + blueprint.name);
        continue;
    }
 
    // update all components.
    for (var componentId in bpJson.components) {
        var component = bpJson.components[componentId];
        if (component.data && component.data._cluster) {
            System.log("Found component: " + componentId);
            System.log("Current min value: " + component.data._cluster.facets.minValue.value.value);
            
            // Re-assigning maxValue
            component.data._cluster.facets.maxValue.value.value = componentMaxValue;
        }
    }

    // update deployment number of instances if the property exists
    if (bpJson.properties && bpJson.properties._number_of_instances) {
        System.log("Current max number of instances: " + bpJson.properties._number_of_instances.facets.maxValue.value.value);
        bpJson.properties._number_of_instances.facets.maxValue.value.value = deploymentNumberOfInstances;
    }

    // Stringify and update
    var updatedJson = JSON.stringify(bpJson);
    restClient.put(blueprintSpecificUrl, updatedJson);
}
