/**
 * Add disk
 *
 * @param {VC:VirtualMachine} vm
 * @param {number} scsiControllerKey
 * @param {number} diskSize
 * @param {VC:VirtualDiskMode} diskMode
 * @param {number} diskIndex
 * @param {VC:Datastore} datastore
 * @param {boolean} thinProvisioned
 * @return {VC:Task} task
 */
var configSpec = new VcVirtualMachineConfigSpec();
var deviceConfigSpecs = new Array();
var deviceConfigSpec;

// Add/Create the disk
deviceConfigSpec = System.getModule("com.vmware.library.vc.vm.spec.config.device").createVirtualDiskFlatVer2ConfigSpec(
	diskSize, datastore, scsiControllerKey, diskIndex, VcVirtualDiskMode.fromString(diskMode.name), thinProvisioned );
deviceConfigSpecs[0] = deviceConfigSpec;

// List of devices
configSpec.deviceChange = deviceConfigSpecs;

// Launch the reconfigVM task
task = vm.reconfigVM_Task( configSpec );
