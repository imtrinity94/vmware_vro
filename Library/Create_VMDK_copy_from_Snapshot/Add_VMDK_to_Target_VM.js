/**
 * Add VMDK to Target VM
 *
 * @param {VC:VirtualMachine} targetVM - [object Object]
 * @param {string} diskPath
 * @param {number} diskControllerKey
 * @param {string} deviceDiskMode
 * @param {boolean} progress
 * @param {number} pollRate
 * @param {VC:Datastore} datastore1
 * @param {VC:Datastore} targetDatastore
 * @return {number} diskKey
 * @return {boolean} addedVMDK
 */
var devices = targetVM.config.hardware.device;
var targetDisk = new Array();

var datacenter = System.getModule("com.vmware.library.vc.basic").getDatacenterForVimObject(datastore1) ;
var targetDatacenter = System.getModule("com.vmware.library.vc.basic").getDatacenterForVimObject(targetDatastore) ;
for (var i in devices) {  
    if (devices[i] instanceof VcVirtualDisk) {  
        if (devices[i].deviceInfo!=null){ 
			targetDisk[i]= devices[i];
		}
	}
}

var lastIndex = targetDisk.length-1;
targetVMDiskKey = targetDisk[lastIndex].key;
targetVMUnitNumber = targetDisk[lastIndex].unitNumber;

//Change UUID of Virtual Disk
sdkConnection = datastore1.sdkConnection;
var myVcVirtualDiskManager = sdkConnection.virtualDiskManager;
var oldUUID = myVcVirtualDiskManager.queryVirtualDiskUuid(diskPath , datacenter);

var vmdkList = System.getModule("com.vmware.library.vc.datastore.files").getAllVmdkFile(targetDatastore);
for(var j = 0 ; j < vmdkList.length ; j++){
		var targetUUId = myVcVirtualDiskManager.queryVirtualDiskUuid(vmdkList[j] , targetDatacenter);	
		if(targetUUId.indexOf(oldUUID) != -1)
		{
			guid = genUUID() + genUUID() + genUUID() + genUUID(); // generate new UUID of new VMDK file
			var uuid = guid.split("");
			var secHalf = uuid[0]+uuid[1]+" "+uuid[2]+uuid[3]+" "+uuid[4]+uuid[5]+" "+uuid[6]+uuid[7]+" "+uuid[8]+uuid[9]+" "+uuid[10]+uuid[11]+" "+uuid[12]+uuid[13]+" "+uuid[14]+uuid[15];

			var currentUUID = oldUUID.split("-")[0];
			var generatedUuid = currentUUID.trim() + "-" + secHalf;
			myVcVirtualDiskManager.setVirtualDiskUuid(diskPath , datacenter , generatedUuid);
		}
}
// Create Disk BackingInfo
var diskBackingInfo = new VcVirtualDiskFlatVer2BackingInfo();
diskBackingInfo.fileName = diskPath;
diskBackingInfo.diskMode = deviceDiskMode;

// Create VirtualDisk object and add existing disk
var disk = new VcVirtualDisk();
disk.backing = diskBackingInfo;
disk.controllerKey = diskControllerKey;
disk.unitNumber = targetVMUnitNumber+1;

disk.key = targetVMDiskKey+1;
diskKey = disk.key;

System.debug("disk.controllerKey :"+ disk.controllerKey + " , diskKey :"+ disk.key  + " and diskUnitNumber :" + disk.unitNumber + " for the VMDK to be added in target VM"); 

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
task = targetVM.reconfigVM_Task(configSpec);
var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,progress,pollRate) ;

System.log("Added VMDK to Target VM: "+ targetVM.name);
addedVMDK = true;

function genUUID() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

