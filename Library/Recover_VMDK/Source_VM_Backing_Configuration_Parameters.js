/**
 * Source VM Backing Configuration Parameters
 *
 * @param {VC:Datastore} datastore1 - [object Object]
 * @param {string} vmdkFile - [object Object]
 * @param {VC:VirtualMachine} sourceVM
 * @param {VC:Datastore} existingDatastore
 * @param {string} param1
 * @return {string} diskPath
 * @return {number} diskControllerKey
 * @return {string} deviceDiskMode
 * @return {number} diskKey
 * @return {number} diskUnitNumber
 */
var devices = sourceVM.config.hardware.device;  
for (var i in devices) {  
    if (devices[i] instanceof VcVirtualDisk) {  
        if (devices[i].deviceInfo!=null){ 
			if(devices[i].backing.fileName.indexOf(vmdkFile)!= -1){
	       			diskControllerKey = devices[i].controllerKey;
					deviceDiskMode = devices[i].backing.diskMode;
					diskKey = devices[i].key;
					diskUnitNumber = devices[i].unitNumber;
		}
	  }
  }  
}  

var vmdkFileList = System.getModule("com.vmware.library.vc.datastore.files").getAllVmdkFile(datastore1);
var datastoreVMDKList = new Array();
var vmdk = new Array();
var vmdkFileName = vmdkFile.split("]");
var diskPath;

for(i=0; i<vmdkFileList.length; i++){
	vmdk=vmdkFileList[i].split("]");
	datastoreVMDKList[i] = vmdk[1];
}

for(i=0;i<vmdkFileList.length;i++){
	if(datastoreVMDKList[i].indexOf(vmdkFileName[1])!= -1){
			System.log("Match found :"+datastoreVMDKList[i]);
			diskPath = vmdkFileList[i];
			System.log("DiskPath of VMDK file :" +diskPath);
			break;
}
}
if(!diskPath){
throw "Could not find the VMDK file in specified Snapshot";
}
