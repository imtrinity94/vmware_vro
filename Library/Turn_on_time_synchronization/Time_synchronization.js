/**
 * Time synchronization
 *
 * @param {VC:VirtualMachine} vm
 * @return {VC:Task} task
 */
// Check if time synchronization is supported
if (!vm.capability.toolsSyncTimeSupported){
	System.error("Time synchronization is not supported for this vm: " + vm.name);
}
else {
	var toolsConfig = vm.config.tools;
	if (toolsConfig.syncTimeWithHost){
		System.log("Time synchronization is already enabled for this vm: " + vm.name);
	}
	else {
		toolsConfig.syncTimeWithHost = true;
		
		var myVcVirtualMachineConfigSpec = new VcVirtualMachineConfigSpec() ;
		myVcVirtualMachineConfigSpec.tools = toolsConfig;
		System.log("Setting time synchronization for vm: " + vm.name);
		task = vm.reconfigVM_Task(myVcVirtualMachineConfigSpec);
	}
}