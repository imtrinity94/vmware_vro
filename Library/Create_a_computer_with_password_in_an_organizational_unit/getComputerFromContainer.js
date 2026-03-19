/**
 * Get a computer by its name in the given OU or Group (container)
 *
 * @param {AD:OrganizationalUnit} container - [object Object]
 * @param {string} computerName - [object Object]
 * @return {AD:ComputerAD} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.microsoft.activeDirectory").getComputerFromContainer(container,computerName) ;