/**
 * Mount floppy
 *
 * @param {VC:VirtualMachine} vm
 * @param {string} flpFile
 * @param {Any} floppy
 * @return {VC:Task} task
 */
floppy.backing = new VcVirtualFloppyImageBackingInfo();
floppy.backing.fileName = flpFile;

var deviceChange = new VcVirtualDeviceConfigSpec();
deviceChange.device = floppy;
deviceChange.operation = VcVirtualDeviceConfigSpecOperation.edit;

var spec = new VcVirtualMachineConfigSpec();
var changes = new Array();
changes.push(deviceChange);
spec.deviceChange = changes;

task = vm.reconfigVM_Task(spec);