/**
 * Searches for and returns a vCenter VM Folder object using its inventory path.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:SdkConnection} vCenter vCenter SDK Connection.
 * @param {string} datacenterName Name of the Datacenter in vCenter.
 * @param {string} folderPath The relative folder path (e.g., "tier1/vms").
 * @returns {VC:VmFolder|null} The folder object if found, otherwise null.
 */

if (!vCenter) { 
    throw 'No vCenter Server provided'; 
}

var vmFolder = null;
var searchIndex = vCenter.searchIndex;
var folderInventoryPath = "/" + datacenterName + "/vm/" + folderPath;

System.debug("vCenter Name: " + vCenter.name);
System.debug("vCenter Folder Path: " + folderInventoryPath);

try {
    vmFolder = searchIndex.findByInventoryPath(folderInventoryPath);
} catch (e) {
    System.error("Error finding inventory path: " + e);
}

if (vmFolder) {
    System.log("Found VM Folder: " + vmFolder.name);
} else {
    System.warn("VM Folder not found: " + folderInventoryPath);
}

return vmFolder;
