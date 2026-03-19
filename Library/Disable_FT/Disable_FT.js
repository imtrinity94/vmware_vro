/**
 * Disable FT
 *
 * @param {VC:VirtualMachine} vm
 * @return {VC:Task} task
 */
System.log("VM's fault tolerance info:" + vm.config.ftInfo);
if ( vm.config.ftInfo != null ) {
	if ( vm.config.ftInfo.role == 1 ) {
		System.log("VM's fault tolerance secondary vm: " + vm.config.ftInfo.secondaries[0]);
		task = vm.disableSecondaryVM_Task(vm.config.ftInfo.secondaries[0]);
	} else {
		throw "The VM: " + vm.name + " is not a primary VM!";
	}
} else {
	throw "Fault tolerance is not switched on!";
}