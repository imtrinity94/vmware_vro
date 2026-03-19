/**
 * Destroy the Virtual Machine, removing it from the Inventory AND from the Datastore!
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @return {VC:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm").destroyVm(vm) ;