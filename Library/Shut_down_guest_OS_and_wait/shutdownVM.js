/**
 * Shutdown the VM guest and wait for a given time before throwing an error if the VM is still not powered off. If timeout is set to 0, the action don't wait
 *
 * @param {VC:VirtualMachine} vm
 * @param {number} timeout - [object Object]
 * @param {number} polling - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.vmware.library.vc.vm.power").shutdownVM(vm,timeout,polling) ;