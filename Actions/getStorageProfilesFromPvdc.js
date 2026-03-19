/**
 * Retrieves storage profiles from a Provider VDC (pVDC) that are NOT already in use by a specific Organization VDC (vDC).
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @version 1.0.0
 * @param {vCloud:ProviderVdc} pvdc The Provider VDC object.
 * @param {vCloud:Vdc} vDC The Organization VDC object.
 * @returns {vCloud:VdcStorageProfile[]} Array of storage profiles available in pVDC but not in vDC.
 */

var SP_Array = pvdc.getProviderStorageProfiles();

// Extract existing storage profiles from the target oVDC
var vdcStorageProfiles = vDC.vdcStorageProfiles.vdcStorageProfile;
var existingRefs = vdcStorageProfiles.enumerate();

for (var i = 0; i < existingRefs.length; i++) {
    // Assuming the specific vCD host helper module exists in the environment
    var existingProfile = System.getModule("org.telus.vCloud").getvCloudHost().getEntityByReference(VclFinderType.VDC_STORAGE_PROFILE, existingRefs[i]);
    
    if (existingProfile) {
        for (var j = 0; j < SP_Array.length; j++) {
            if (existingProfile.name == SP_Array[j].name) {
                SP_Array.splice(j, 1);
                break; // Found and removed, move to next existing ref
            }
        }
    }
}

SP_Array = condenseSparseArray(SP_Array);
return SP_Array;

/**
 * Returns a condensed Array with no empty items.
 * @private
 * @param {Array} a Input array.
 * @returns {Array} Condensed array.
 */
function condenseSparseArray(a) { 
    var b = []; 
    for (var ind = 0; ind < a.length; ind++) { 
        if (a[ind] !== undefined && a[ind] !== null) { 
            b.push(a[ind]); 
        }
    } 
    return b; 
}
