/**
 * Reverts the virtual machine to the current snapshot. This is equivalent to doing snapshot.currentSnapshot.revert.
If no snapshot exists, then the operation does nothing, and the virtual machine state remains unchanged.
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @param {VC:HostSystem} host - [object Object]
 * @return {VC:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.snapshot").revertToCurrentSnapshot(vm,host) ;