/**
 * An object representation of a Windows sysprep.inf answer file. The sysprep type encloses all the individual keys listed in a sysprep.inf file. For more detailed information, see the document Windows 2000 Unattended Setup Guide.
 *
 * @param {Any} guiRunOnce - [object Object]
 * @param {Any} guiUnattended - [object Object]
 * @param {Any} identification - [object Object]
 * @param {Any} licenseFilePrintData - [object Object]
 * @param {Any} userData - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.spec.identity").getCustomizationSysprep(guiRunOnce,guiUnattended,identification,licenseFilePrintData,userData) ;