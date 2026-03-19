/**
 * Generate backup reports
 *
 * @param {CS:CohesityConnection} connection - [object Object]
 * @param {Array/string} recipients - [object Object]
 * @param {Array/CS:RootNode} protectionSources - [object Object]
 * @param {CS:ProtectionJob} protectionJob - [object Object]
 * @param {string} format - [object Object]
 * @param {string} lastNDays - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.cohesity.plugin.protectionSources.reports").generateBackupReport(connection,recipients,protectionSources,protectionJob,format,lastNDays) ;