/**
 * Deletes a business group in vRealize Automation (vRA) for a specific tenant.
 * Uses vCACCAFEEntitiesFinder to locate the business group and then the REST API to perform the deletion.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCACCAFE:VCACHost} vcacCafeHost vRealize Automation host object.
 * @param {string} tenant Name of the tenant.
 * @param {string} businessGroupToDelete Name of the business group to delete.
 * @returns {void}
 */

// Getting case of business group name, incase BG passed in is wrong case.
var entity = vCACCAFEEntitiesFinder.findBusinessGroups(vcacCafeHost, businessGroupToDelete);
if (!entity || entity.length === 0) {
    throw "Could not find business group: " + businessGroupToDelete;
}

var targetBg = null;
for each (var bg in entity) {
    if (bg.tenantId.toLowerCase() == tenant.toLowerCase()) {
        System.log("Found the following business group: " + bg.name + " in " + bg.tenantId);
        targetBg = bg;
        break;
    }
}

if (!targetBg) {
    throw "Could not find business group '" + businessGroupToDelete + "' in tenant '" + tenant + "'";
}

// create rest endpoint for rest client
var endpoint = 'com.vmware.csp.core.cafe.identity.api';
var restClient = vcacCafeHost.createRestClient(endpoint);
var businessGroupUrl = "tenants/" + targetBg.tenantId + "/subtenants?filter=name eq '" + targetBg.name + "'";

// get business groups
var businessGroupsResponse = restClient.get(businessGroupUrl);
var res = businessGroupsResponse.getBodyAsString();

// clean json and parse
var json = JSON.parse(res.replace(/\\/g, ''));

for each (var v in json.content) {
    System.log("Business Group name: " + v.name + " and ID: " + v.id);

    // match and delete business group by name
    try {
        if (v.name == targetBg.name) {
            var deleteUrl = "tenants/" + targetBg.tenantId + "/subtenants/" + v.id;
            System.log("Deleting business group: " + targetBg.name + " with the follow REST URL: " + deleteUrl);
            restClient.delete(deleteUrl);
            System.log("Deleted business group successfully");
            break;
        }
    } catch (e) {
        System.error("Failed to delete business group: " + e);
        break;
    }
}
