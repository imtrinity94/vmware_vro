/**
 * Add IDE Bus 0
 *
 * @param {VC:VirtualMachine} vm
 * @return {VC:Task} task
 */
var configSpec = new VcVirtualMachineConfigSpec();
var deviceConfigSpecs = new Array();
var deviceConfigSpec;

var controller = new VcVirtualIDEController();
controller.key = -1;
controller.device = new Array(0);
controller.busNumber = 0;
deviceConfigSpec = new VcVirtualDeviceConfigSpec();
deviceConfigSpec.device = controller;
deviceConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.add;
deviceConfigSpecs[0] = deviceConfigSpec;

// List of devices
configSpec.deviceChange = deviceConfigSpecs;

// Launch the reconfigVM task
task = vm.reconfigVM_Task( configSpec );
