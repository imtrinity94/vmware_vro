/**
 * Create a new protection job to protect MSSQL Databases.
 *
 * @param {CS:CohesityConnection} cluster - [object Object]
 * @param {CS:RootNode} sqlRootNode - [object Object]
 * @param {CS:SourceRootNode} sqlHost - [object Object]
 * @param {CS:Node} sqlInstance - [object Object]
 * @param {Array/CS:Node} aagDatabases - [object Object]
 * @param {Array/CS:Node} standaloneDatabases - [object Object]
 * @param {boolean} autoprotectHost - [object Object]
 * @param {boolean} protectSystemDbs - [object Object]
 * @param {CS:ProtectionJob} protectionJob - [object Object]
 * @param {boolean} createNewJob - [object Object]
 * @param {string} backupType - [object Object]
 * @param {string} name - [object Object]
 * @param {string} description - [object Object]
 * @param {CS:ProtectionPolicy} protectionPolicy - [object Object]
 * @param {CS:ViewBox} viewBox - [object Object]
 * @param {string} qosType - [object Object]
 * @param {string} priority - [object Object]
 * @param {string} startTime - [object Object]
 * @param {string} timezone - [object Object]
 * @param {number} fullProtectionSlaTimeMins - [object Object]
 * @param {number} incrementalProtectionSlaTimeMins - [object Object]
 * @param {boolean} enableIndexing - [object Object]
 * @param {Array/string} indexAllowPrefixes - [object Object]
 * @param {Array/string} indexDenyPrefixes - [object Object]
 * @param {Array/string} alertingPolicy - [object Object]
 * @param {Array/string} alertEmails - [object Object]
 * @param {number} sqlStreams - [object Object]
 * @param {boolean} fullCopyOnly - [object Object]
 * @return {CS:ProtectionJob} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.dev.workflows").protectSQLDatabases(cluster,sqlRootNode,sqlHost,sqlInstance,aagDatabases,standaloneDatabases,autoprotectHost,protectSystemDbs,protectionJob,createNewJob,backupType,name,description,protectionPolicy,viewBox,qosType,priority,startTime,timezone,fullProtectionSlaTimeMins,incrementalProtectionSlaTimeMins,enableIndexing,indexAllowPrefixes,indexDenyPrefixes,alertingPolicy,alertEmails,sqlStreams,fullCopyOnly) ;