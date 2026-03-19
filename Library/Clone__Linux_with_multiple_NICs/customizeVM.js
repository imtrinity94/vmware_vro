/**
 * Try to customize a VM. (no clone operation done)

If any Exception appens, raise a "VMware3:CloneException" with no object attached.
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @param {Any} customizationSpec - [object Object]
 * @return {VC:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm").customizeVM(vm,customizationSpec) ;