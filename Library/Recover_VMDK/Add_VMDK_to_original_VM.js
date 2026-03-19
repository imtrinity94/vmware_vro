/**
 * Add VMDK to original VM
 *
 * @param {string} diskPath
 * @param {number} diskKey
 * @param {number} diskControllerKey
 * @param {string} deviceDiskMode
 * @param {number} diskUnitNumber
 * @param {VC:VirtualMachine} sourceVM
 * @param {boolean} progress
 * @param {number} pollRate
 * @param {VC:Datastore} existingDatastore
 * @param {VC:Datastore} tempDatastore - [object Object]
 * @return {number} diskKey
 */
var devices = sourceVM.config.hardware.device;  
var datacenter = System.getModule("com.vmware.library.vc.basic").getDatacenterForVimObject(tempDatastore) ;
var sourceDisk = new Array();
var flag = 0;
for (var i in devices) {  
    if (devices[i] instanceof VcVirtualDisk) {  
        if (devices[i].deviceInfo!=null){ 
			sourceDisk[i]= devices[i];
		}
	}
}

//Change UUID of Virtual Disk if already duplicate VMDKs present before recovering
sdkConnection = tempDatastore.sdkConnection;
var myVcVirtualDiskManager = sdkConnection.virtualDiskManager;
var oldUUID = myVcVirtualDiskManager.queryVirtualDiskUuid(diskPath , datacenter);

var vmdkList = System.getModule("com.vmware.library.vc.datastore.files").getAllVmdkFile(existingDatastore);
for(var j = 0 ; j < vmdkList.length ; j++){
		var targetUUId = myVcVirtualDiskManager.queryVirtualDiskUuid(vmdkList[j] , datacenter);	
		if(targetUUId.indexOf(oldUUID) != -1)
		{
			flag++;
		}
}
if(flag > 0)
{
	guid = genUUID() + genUUID() + genUUID() + genUUID(); // generate new UUID of new VMDK file
			var uuid = guid.split("");
			var secHalf = uuid[0]+uuid[1]+" "+uuid[2]+uuid[3]+" "+uuid[4]+uuid[5]+" "+uuid[6]+uuid[7]+" "+uuid[8]+uuid[9]+" "+uuid[10]+uuid[11]+" "+uuid[12]+uuid[13]+" "+uuid[14]+uuid[15];

			var currentUUID = oldUUID.split("-")[0];
			var generatedUuid = currentUUID.trim() + "-" + secHalf;
			myVcVirtualDiskManager.setVirtualDiskUuid(diskPath , datacenter , generatedUuid);
}

// Create Disk BackingInfo
var diskBackingInfo = new VcVirtualDiskFlatVer2BackingInfo();
diskBackingInfo.fileName = diskPath;
diskBackingInfo.diskMode = deviceDiskMode;

// Create VirtualDisk object and add existing disk
var disk = new VcVirtualDisk();
disk.backing = diskBackingInfo;
disk.controllerKey = diskControllerKey;

if(sourceDisk.length > 0){
	var lastIndex = sourceDisk.length-1;
	sourceVMDiskKey = sourceDisk[lastIndex].key;
	sourceVMUnitNumber = sourceDisk[lastIndex].unitNumber;
	disk.unitNumber = sourceVMUnitNumber + 1;
	disk.key = sourceVMDiskKey + 1;
	diskKey = disk.key;
}
else{
	disk.unitNumber = diskUnitNumber;
	disk.key = diskKey;
}


System.debug("diskBackingInfo.fileName: "+ diskBackingInfo.fileName + " , diskBackingInfo.diskMode: " + diskBackingInfo.diskMode +" , disk.controllerKey :"+ disk.controllerKey + " , diskKey :"+ disk.key  + " and diskUnitNumber :" + disk.unitNumber + " for the VMDK to be added in target VM"); 

// Create Disk ConfigSpec
var deviceConfigSpec = new VcVirtualDeviceConfigSpec();
deviceConfigSpec.device = disk;

deviceConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.add;

var deviceConfigSpecs = [];
deviceConfigSpecs.push(deviceConfigSpec);

// List of devices
var configSpec = new VcVirtualMachineConfigSpec();
configSpec.deviceChange = deviceConfigSpecs;

// Launch the reconfigVM task
var task = sourceVM.reconfigVM_Task(configSpec);
System.log("Added VMDK to VM: "+ sourceVM.name);

var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,progress,pollRate);

function genUUID() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}