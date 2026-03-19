/**
 * Gets a computer by its name in the given organizational unit or group (container).
 *
 * @param {Any} container - [object Object]
 * @param {string} ouName - [object Object]
 * @return {AD:OrganizationalUnit} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.microsoft.activeDirectory").getOrganizationUnitFromOrganizationUnit(container,ouName) ;