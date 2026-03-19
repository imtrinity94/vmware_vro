/**
 * Get total number of NIC (network interface card) of a VM
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @return {number} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.network").getNumberOfNic(vm) ;