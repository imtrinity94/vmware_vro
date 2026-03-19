/**
 * Updates the specified CohesityEndpoint from the plug-in's repository.
 *
 * @param {string} currentConnectionName - [object Object]
 * @param {string} newCohesityAddress - [object Object]
 * @param {string} newConnectionName - [object Object]
 * @param {string} newDomainName
 * @param {SecureString} newPassword - [object Object]
 * @param {string} newUserName - [object Object]
 * @return {CS:CohesityConnection} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.configuration").updateCohesityEndpoint(currentConnectionName,newConnectionName,newCohesityAddress,newDomainName,newUserName,newPassword) ;