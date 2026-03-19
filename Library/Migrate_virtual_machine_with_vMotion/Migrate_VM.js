/**
 * Migrate VM
 *
 * @param {VC:VirtualMachine} vm
 * @param {VC:VirtualMachinePowerState} state
 * @param {VC:VirtualMachineMovePriority} priority
 * @param {VC:ResourcePool} pool
 * @param {VC:HostSystem} host
 * @return {VC:Task} task
 */
var movePriority = null
if (priority != null) {
	movePriority = VcVirtualMachineMovePriority.fromString(priority.name);
}

var exState = null
if (state != null) {
	exState = VcVirtualMachinePowerState.fromString(state.name);
}

task = vm.migrateVM_Task(pool, host, movePriority, exState);