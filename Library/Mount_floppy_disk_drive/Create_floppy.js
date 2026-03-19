/**
 * Create floppy
 *
 * @param {VC:VirtualMachine} vm
 * @param {string} flpFile
 * @return {VC:Task} task
 */
var device = new VcVirtualFloppy();
device.key = -1;
device.backing = new VcVirtualFloppyImageBackingInfo();
device.backing.fileName = flpFile;

var deviceChange = new VcVirtualDeviceConfigSpec();
deviceChange.device = device;
deviceChange.operation = VcVirtualDeviceConfigSpecOperation.add;

var spec = new VcVirtualMachineConfigSpec();
var changes = new Array();
changes.push(deviceChange);
spec.deviceChange = changes;

task = vm.reconfigVM_Task(spec);