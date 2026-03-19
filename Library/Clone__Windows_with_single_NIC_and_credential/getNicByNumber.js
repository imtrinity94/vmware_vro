/**
 * Return a Network card device (VimVirtualE1000, VimVirtualVmxnet, VimVirtualPCNet32). The network position let you choose if you want to get the 1st, 2nd... 5th network card.
 *
 * @param {VC:VirtualMachine} vm - [object Object]
 * @param {number} nicPosition - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.network").getNicByNumber(vm,nicPosition) ;