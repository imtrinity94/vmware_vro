/**
 * Gets a computer by its name in the given OU or group (container).
 *
 * @param {string} computerName - [object Object]
 * @param {Any} container - [object Object]
 * @return {AD:ComputerAD} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.microsoft.activeDirectory").getComputerFromContainer(container,computerName) ;