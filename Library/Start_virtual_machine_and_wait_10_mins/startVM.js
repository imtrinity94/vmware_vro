/**
 * Start / Resume a VM. Return the start task
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @param {VC:HostSystem} host - [object Object]
 * @return {VC:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.power").startVM(vm,host) ;