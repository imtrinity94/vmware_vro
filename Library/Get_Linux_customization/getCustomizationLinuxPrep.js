/**
 * This is the Linux counterpart to the Windows Sysprep object. LinuxPrep contains machine-wide settings that identify a Linux machine in the same way that the Sysprep type identifies a Windows machine.
 *
 * @param {string} domain - [object Object]
 * @param {Any} hostName - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vc.vm.spec.identity").getCustomizationLinuxPrep(domain,hostName) ;