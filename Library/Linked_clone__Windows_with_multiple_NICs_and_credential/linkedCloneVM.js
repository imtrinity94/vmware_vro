/**
 * Try to clone a VM. 

If any Exception appens, raise a "VMware3:CloneException" with no object attached.
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @param {VC:VmFolder} folder - [object Object]
 * @param {string} name - [object Object]
 * @param {Any} spec - [object Object]
 * @param {VC:VirtualMachineSnapshot} snapshot - [object Object]
 * @return {VC:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm").linkedCloneVM(vm,folder,name,spec,snapshot) ;