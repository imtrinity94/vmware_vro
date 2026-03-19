/**
 * Personal data pertaining to the owner of the virtual machine.
 *
 * @param {Any} computerName - [object Object]
 * @param {string} fullName - [object Object]
 * @param {string} orgName - [object Object]
 * @param {string} productId - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.spec.identity").getCustomizationUserData(computerName,fullName,orgName,productId) ;