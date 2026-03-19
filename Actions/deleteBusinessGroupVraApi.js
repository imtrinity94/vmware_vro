/**
 * @description Deletes a business group in vRealize Automation (vRA) for a specific tenant.
 *              Uses vCACCAFEEntitiesFinder to locate the business group and then the REST API to perform the deletion.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCACCAFE:VCACHost} vcacHost vRealize Automation host object.
 * @param {string} tenantName Name of the tenant.
 * @param {string} bgNameToDelete Name of the business group to delete.
 * @returns {void}
 */

// Search for business group entities
var bgEntitiesList = vCACCAFEEntitiesFinder.findBusinessGroups(vcacHost, bgNameToDelete);
if (!bgEntitiesList || bgEntitiesList.length === 0) {
    throw "Could not find business group: " + bgNameToDelete;
}

var targetBusinessGroup = null;
var i;
for (i = 0; i < bgEntitiesList.length; i++) {
    var bgObj = bgEntitiesList[i];
    if (bgObj.tenantId.toLowerCase() == tenantName.toLowerCase()) {
        System.log("Matched business group: " + bgObj.name + " in tenant " + bgObj.tenantId);
        targetBusinessGroup = bgObj;
        break;
    }
}

if (!targetBusinessGroup) {
    throw "Could not find business group '" + bgNameToDelete + "' in tenant '" + tenantName + "'";
}

// Prepare REST request
var identityApiEndpoint = 'com.vmware.csp.core.cafe.identity.api';
var restClientSession = vcacHost.createRestClient(identityApiEndpoint);
var searchUrl = "tenants/" + targetBusinessGroup.tenantId + "/subtenants?filter=name eq '" + targetBusinessGroup.name + "'";

var searchResponse = restClientSession.get(searchUrl);
var responseBody = searchResponse.getBodyAsString();

// Clean and parse JSON
var jsonResponse = JSON.parse(responseBody.replace(/\\/g, ''));

var contentList = jsonResponse.content;
var j;
for (j = 0; j < contentList.length; j++) {
    var currentBg = contentList[j];
    System.debug("Processing subtenant content: " + currentBg.name + " (" + currentBg.id + ")");

    if (currentBg.name == targetBusinessGroup.name) {
        try {
            var deletePath = "tenants/" + targetBusinessGroup.tenantId + "/subtenants/" + currentBg.id;
            System.log("Deleting business group via REST: " + deletePath);
            restClientSession.delete(deletePath);
            System.log("Business group '" + targetBusinessGroup.name + "' deleted successfully.");
            break;
        } catch (ex) {
            System.error("Failed to execute deletion for business group " + currentBg.id + ": " + ex);
            break;
        }
    }
}

return null;
