/**
 * Detach VMDK from VM
 *
 * @param {number} diskKey
 * @param {VC:VirtualMachine} targetVM
 * @param {boolean} progress
 * @param {number} pollRate
 */
var disk = new VcVirtualDisk();
disk.key = diskKey;

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
task = targetVM.reconfigVM_Task(configSpec);
var actionResult = System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,progress,pollRate) ;
System.log("Removed newly added VMDK from Target VM: "+ targetVM.name);