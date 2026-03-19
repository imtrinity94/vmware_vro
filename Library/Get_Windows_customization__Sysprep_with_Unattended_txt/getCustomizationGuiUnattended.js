/**
 * The GuiUnattended type maps to the GuiUnattended key in the sysprep.inf answer file. These values are plugged directly into the sysprep.inf file that VirtualCenter stores on the target virtual disk.
 *
 * @param {boolean} autoLogon - [object Object]
 * @param {number} autoLogonCount - [object Object]
 * @param {Any} password - [object Object]
 * @param {number} timeZone - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.spec.identity").getCustomizationGuiUnattended(autoLogon,autoLogonCount,password,timeZone) ;