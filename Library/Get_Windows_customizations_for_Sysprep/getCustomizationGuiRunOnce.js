/**
 * The commands listed in the GuiRunOnce data object type are executed when a user logs on the first time after customization completes. The logon may be driven by the AutoLogon setting.
 *
 * @param {Array/string} commandList - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.spec.identity").getCustomizationGuiRunOnce(commandList) ;