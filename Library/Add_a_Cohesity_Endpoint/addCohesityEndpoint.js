/**
 * Adds a CohesityEndpoint object to the plug-in's repository.
 *
 * @param {string} connectionName - [object Object]
 * @param {string} cohesityAddress - [object Object]
 * @param {string} userName - [object Object]
 * @param {SecureString} password - [object Object]
 * @param {string} domainName
 * @return {CS:CohesityConnection} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.configuration").addCohesityEndpoint(connectionName,cohesityAddress,domainName,userName,password) ;