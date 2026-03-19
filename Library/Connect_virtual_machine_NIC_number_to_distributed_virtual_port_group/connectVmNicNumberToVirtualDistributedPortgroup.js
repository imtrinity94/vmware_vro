/**
 * Reconfigures the backing (network connection) of the specified NIC number (0-5) to connect to the specified distributed virtual port group. If a NIC number is not specified, zero is used.
 *
 * @param {VC:VirtualMachine} vm
 * @param {VC:DistributedVirtualPortgroup} dvPortgroup
 * @param {number} nicNumber
 * @return {VC:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.networking").connectVmNicNumberToVirtualDistributedPortgroup(vm,dvPortgroup,nicNumber) ;