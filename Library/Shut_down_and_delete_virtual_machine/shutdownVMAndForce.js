/**
 * Try to shutdown a VM guest. If still not power off after 5 minutes, force power off.
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @param {number} timeout - [object Object]
 * @param {number} polling - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.vmware.library.vc.vm.power").shutdownVMAndForce(vm,timeout,polling) ;