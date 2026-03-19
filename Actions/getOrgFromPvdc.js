/**
 * Retrieves the Organizations (Orgs) associated with a given Provider VDC (pVDC).
 * Navigates from pVDC to Admin VDCs and then to their parent Organizations.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCloud:ProviderVdc} pvdc The Provider VDC object.
 * @returns {vCloud:Organization[]} An array of vCloud Organization objects.
 */

var adminVdcs = pvdc.getAdminVdcs();
var ovdcArray = [];

for (var index = 0; index < adminVdcs.length; index++) {
    ovdcArray.push(adminVdcs[index].parent);
}

// Remove duplicates using local helper function
ovdcArray = removeDuplicates(ovdcArray);

if (ovdcArray.length === 0) {
    System.error("No Organizations found inside " + pvdc.name + " pVDC");
} else {
    for (var i = 0; i < ovdcArray.length; i++) {
        System.log("Found Organization: " + ovdcArray[i].name);
    }
}

/**
 * Removes duplicate items from an array.
 * @private
 */
function removeDuplicates(array) {
    var seen = {};
    return array.filter(function(item) {
        var key = item.id || item.href || item;
        if (seen.hasOwnProperty(key)) {
            return false;
        } else {
            seen[key] = true;
            return true;
        }
    });
}

return ovdcArray;
