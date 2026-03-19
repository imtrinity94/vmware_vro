/**
 * Shuts down the virtual machine's guest OS and waits for a specified period of time before throwing an error if the virtual machine is still not powered off. If the timeout is set to 0, the action does not wait.
 *
 * @param {VC:VirtualMachine} vm
 * @param {number} timeout - [object Object]
 * @param {number} polling - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.vmware.library.vc.vm.power").shutdownVM(vm,timeout,polling) ;