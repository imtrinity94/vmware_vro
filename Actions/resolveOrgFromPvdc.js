/**
 * Retrieves the Organizations (Orgs) associated with a given Provider VDC (pVDC).
 * Navigates from pVDC to Admin VDCs and then to their parent Organizations.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCloud:ProviderVdc} vcloudPvdc The Provider VDC object.
 * @returns {vCloud:Organization[]} organizationsList - An array of vCloud Organization objects.
 */

var adminVdcsList = vcloudPvdc.getAdminVdcs();
var organizationsList = [];

var index;
for (index = 0; index < adminVdcsList.length; index++) {
    var vdcParentOrg = adminVdcsList[index].parent;
    if (vdcParentOrg) {
        organizationsList.push(vdcParentOrg);
    }
}

// Remove duplicates using local helper function
organizationsList = deduplicateOrgArray(organizationsList);

if (organizationsList.length === 0) {
    System.warn("No parent Organizations found for Provider VDC: " + vcloudPvdc.name);
} else {
    var i;
    for (i = 0; i < organizationsList.length; i++) {
        System.log("Discovered Organization associated with pVDC: " + organizationsList[i].name);
    }
}

return organizationsList;

/**
 * Removes duplicate items from an array based on ID or HREF.
 */
function deduplicateOrgArray(inputArray) {
    var seenMap = {};
    return inputArray.filter(function(item) {
        var uniqueKey = item.id || item.href || item.name || item;
        if (seenMap.hasOwnProperty(uniqueKey)) {
            return false;
        } else {
            seenMap[uniqueKey] = true;
            return true;
        }
    });
}
