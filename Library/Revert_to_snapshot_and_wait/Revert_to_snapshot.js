/**
 * Revert to snapshot
 *
 * @param {VC:VirtualMachineSnapshot} snapshot
 * @param {VC:HostSystem} host
 * @return {VC:Task} task
 */
task = snapshot.revertToSnapshot_Task(host);