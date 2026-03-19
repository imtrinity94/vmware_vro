/**
 * Register VM
 *
 * @param {Array/VC:Datastore} newTargetDatastoreList
 * @param {Array/string} vmPaths
 * @return {Array/string} vmPaths
 * @return {Any} vmFolder
 * @return {Array/VC:ResourcePool} vcResourcePool
 */
var vmfx = new Array();
vcResourcePool = [];
for(var dsIndex = 0; dsIndex < newTargetDatastoreList.length; dsIndex++){
	//Get all VMFX files from datastore
	vmfx = System.getModule("com.vmware.library.vc.datastore.files").getAllConfigFile(newTargetDatastoreList[dsIndex]);
	
	//Find the vmfx of VM
	for(var i=0; i< vmfx.length; i++){
		var VMXName = vmfx[i].split("]");
		var vmPath = vmPaths[dsIndex].split("]");
		if(VMXName[1] == vmPath[1]){
			vmPaths[dsIndex] = vmfx[i];
			break;	
		}
	}
	
	var resourcePool = System.getModule("com.vmware.library.vc.resourcePool").getValidResourcePoolForDatastore(newTargetDatastoreList[dsIndex]);
	vcResourcePool.push(resourcePool[0]);
}

vmFolder = System.getModule("com.purestorage.flasharray.vmware.vcenter").getVmFolderfromDatastore(newTargetDatastoreList[0]);
