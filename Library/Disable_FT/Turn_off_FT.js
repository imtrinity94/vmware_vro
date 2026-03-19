/**
 * Turn off FT
 *
 * @param {boolean} turnOff
 * @param {VC:VirtualMachine} vm
 * @return {VC:Task} task
 */
if ( vm.config.ftInfo != null ) {
	task = vm.turnOffFaultToleranceForVM_Task()
} else {
	throw "Fault tolerance is not switched on!";
}
 