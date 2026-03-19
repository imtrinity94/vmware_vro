/**
 * Delete Original VMDK
 *
 * @param {string} vmdkFile
 * @param {VC:Datastore} existingDatastore
 * @param {VC:VirtualMachine} sourceVM
 * @param {number} diskKey
 * @param {boolean} progress
 * @param {number} pollRate
 * @param {number} diskControllerKey
 */
var disk = new VcVirtualDisk();
disk.key = diskKey;
disk.controllerKey = diskControllerKey;

// Create Disk ConfigSpec
var deviceConfigSpec = new VcVirtualDeviceConfigSpec();
deviceConfigSpec.device = disk;

deviceConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.remove;

var deviceConfigSpecs = [];
deviceConfigSpecs.push(deviceConfigSpec);

// List of devices
var configSpec = new VcVirtualMachineConfigSpec();
configSpec.deviceChange = deviceConfigSpecs;

// Launch the reconfigVM task
System.log("Remove/Detach original VMDK from VM: "+ sourceVM.name);
var task = sourceVM.reconfigVM_Task(configSpec);
var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,progress,pollRate) ;

System.log("Deleting Original VMDK");
var actionResult1 = System.getModule("com.vmware.library.vc.datastore.files").deleteFile(existingDatastore,vmdkFile);