/**
 * Enable FT
 *
 * @param {VC:HostSystem} host
 * @param {VC:VirtualMachine} vm
 * @param {boolean} turnOn
 * @return {VC:Task} task
 */
System.log("VM's fault tolerance info:" + vm.config.ftInfo);
if ( vm.config.ftInfo != null ) {
	if ( vm.config.ftInfo.role == 1 ) {
		System.log("VM's fault tolerance secondary VM: " + vm.config.ftInfo.secondaries[0]);
		task = vm.enableSecondaryVM_Task(vm.config.ftInfo.secondaries[0], host);
	} else {
		throw "The VM: " + vm.name + " is not a primary VM!";
	}
} else if (turnOn){
	task = vm.createSecondaryVM_Task(host);
} else {
	throw "Fault tolerance is not switched on!";
}