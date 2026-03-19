/**
 * Retrieves storage profiles from a Provider VDC (pVDC) that are NOT already in use by a specific Organization VDC (vDC).
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @version 1.0.0
 * @param {vCloud:ProviderVdc} vcloudPvdc The Provider VDC object.
 * @param {vCloud:Vdc} vcloudOvdc The Organization VDC object.
 * @returns {vCloud:VdcStorageProfile[]} availableStorageProfilesList - Array of storage profiles available in pVDC but not in oVDC.
 */

var availableStorageProfilesList = vcloudPvdc.getProviderStorageProfiles();

// Extract existing storage profiles from the target oVDC
var existingProfilesSet = vcloudOvdc.vdcStorageProfiles.vdcStorageProfile;
var existingProfileRefsList = existingProfilesSet.enumerate();

System.log("Total storage profiles in pVDC: " + availableStorageProfilesList.length);
System.log("Profiles already in oVDC: " + existingProfileRefsList.length);

var i;
for (i = 0; i < existingProfileRefsList.length; i++) {
    var refObj = existingProfileRefsList[i];
    // Attempting to resolve the reference to its entity name for comparison
    var resolvedProfile = System.getModule("com.vmware.library.vCloud").getvCloudHost().getEntityByReference(VclFinderType.VDC_STORAGE_PROFILE, refObj);
    
    if (resolvedProfile) {
        var j;
        for (j = 0; j < availableStorageProfilesList.length; j++) {
            if (resolvedProfile.name == availableStorageProfilesList[j].name) {
                System.debug("Removing already assigned storage profile: " + availableStorageProfilesList[j].name);
                availableStorageProfilesList.splice(j, 1);
                break; 
            }
        }
    }
}

availableStorageProfilesList = cleanSparseArray(availableStorageProfilesList);

System.log("Remaining available storage profiles: " + availableStorageProfilesList.length);

return availableStorageProfilesList;

/**
 * Returns a condensed Array with no empty items.
 */
function cleanSparseArray(inputArray) { 
    var resultList = []; 
    var k;
    for (k = 0; k < inputArray.length; k++) { 
        if (inputArray[k] !== undefined && inputArray[k] !== null) { 
            resultList.push(inputArray[k]); 
        }
    } 
    return resultList; 
}
