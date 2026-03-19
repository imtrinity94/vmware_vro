/**
 * Gets a user by his name in the given organizational unit or group (container).
 *
 * @param {AD:Group} container - [object Object]
 * @param {string} accountName - [object Object]
 * @return {AD:User} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.microsoft.activeDirectory").getUserFromContainer(container,accountName) ;