/**
 * Use a static IP Address for the virtual network adapter.
 *
 * @param {string} ipAddress
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.spec.nic").getCustomizationFixedIp(ipAddress) ;