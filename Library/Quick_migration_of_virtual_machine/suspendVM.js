/**
 * Suspend a VM. Return the suspend Task
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @return {VC:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.power").suspendVM(vm) ;