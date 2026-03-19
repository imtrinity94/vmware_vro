/**
 * Searches for and returns a vCenter VM Folder object using its inventory path.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:SdkConnection} vcSdkConnection vCenter SDK Connection.
 * @param {string} datacenterName Name of the Datacenter in vCenter.
 * @param {string} relativeFolderPath The relative folder path (e.g., "tier1/vms").
 * @returns {VC:VmFolder|null} vCenterVmFolder - The folder object if found, otherwise null.
 */

if (!vcSdkConnection) { 
    throw "A valid vCenter SDK Connection object must be provided."; 
}

var vCenterVmFolder = null;
var vCenterSearchIndex = vcSdkConnection.searchIndex;
var fullInventoryPath = "/" + datacenterName + "/vm/" + relativeFolderPath;

System.debug("vCenter Instance: " + vcSdkConnection.name);
System.debug("Locating folder at inventory path: " + fullInventoryPath);

try {
    vCenterVmFolder = vCenterSearchIndex.findByInventoryPath(fullInventoryPath);
} catch (pathEx) {
    System.error("Inventory path lookup failed for path '" + fullInventoryPath + "'. Error: " + pathEx);
}

if (vCenterVmFolder) {
    System.log("Successfully matched vCenter VM Folder: " + vCenterVmFolder.name);
} else {
    System.warn("No VM Folder found at the specified inventory path: " + fullInventoryPath);
}

return vCenterVmFolder;
