/**
 * Remove all the snapshots associated with this virtual machine. If the virtual machine does not have any snapshots, then this operation simply returns successfully.
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @return {VC:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.snapshot").removeAllSnapshot(vm) ;