/**
 * registerNewProtectionSource
 *
 * @param {CS:CohesityConnection} connection
 * @param {string} endpoint
 * @param {string} environment - [object Object]
 * @param {string} hostType - [object Object]
 * @param {string} physicalType - [object Object]
 * @param {string} username
 * @param {SecureString} password
 * @param {string} vmwareType - [object Object]
 * @param {string} sourceType - [object Object]
 * @return {CS:SourceRootNode} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.protectionSources").registerNewProtectionSource(connection,endpoint,environment,hostType,physicalType,username,password,vmwareType,sourceType) ;