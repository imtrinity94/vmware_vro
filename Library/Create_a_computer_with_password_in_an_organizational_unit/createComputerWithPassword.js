/**
 * Creates computer with password in the Active Directory.
 *
 * @param {Any} container - [object Object]
 * @param {string} computerName
 * @param {string} domainName
 * @param {SecureString} password
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.microsoft.activeDirectory").createComputerWithPassword(container,computerName,domainName,password) ;