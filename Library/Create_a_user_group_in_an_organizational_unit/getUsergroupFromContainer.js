/**
 * Gets a user group by its name in the given organizational unit or group (container).
 *
 * @param {AD:OrganizationalUnit} container - [object Object]
 * @param {string} usergroupName - [object Object]
 * @return {AD:UserGroup} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.microsoft.activeDirectory").getUsergroupFromContainer(container,usergroupName) ;