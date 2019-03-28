// VMware vRealize Orchestrator action sample
//
// Search for, and return, vCenter VM Folder using the folder path to look it up
// 
// For vRO 7.0+
//
// Action Inputs:
// vCenter - VC:SdkConnection - vCenter SDK Connection
// datacenterName - string - Name of Datacenter in vCenter
// folderPath - string - Folder Path (xpath)
//
// Return type: VC:VmFolder - Folder object from vCenter

if (!vCenter) { throw 'No vCenter Server provided' }

var vmFolder;
var index = vCenter.searchIndex;
var folderInventoryPath = "/"+datacenterName+"/vm/"+folderPath;
System.debug("vCenter Name: "+vCenter.name);
System.debug("vCenter Folder Path: "+folderInventoryPath);
try {
	vmFolder = index.findByInventoryPath(folderInventoryPath);
} catch (e) { } //do nothing

if (vmFolder) {
	System.log("Found VM Folder: "+vmFolder.name);
}
return vmFolder;
