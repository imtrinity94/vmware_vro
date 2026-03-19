/**
 * The LicenseFilePrintData type maps directly to the LicenseFilePrintData key in the sysprep.inf answer file.
 *
 * @param {VC:CustomizationLicenseDataMode} autoMode - [object Object]
 * @param {number} autoUsers - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.spec.identity").getCustomizationLicenseFilePrintData(autoMode,autoUsers) ;