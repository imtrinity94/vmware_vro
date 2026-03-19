/**
 * createNewProtectionJob
 *
 * @param {CS:CohesityConnection} connection - [object Object]
 * @param {CS:ProtectionPolicy} protectionPolicy - [object Object]
 * @param {CS:ViewBox} viewBox - [object Object]
 * @param {string} name - [object Object]
 * @param {string} description - [object Object]
 * @param {CS:PhysicalMachine} physicalMachine - [object Object]
 * @param {CS:VirtualMachine} virtualMachine - [object Object]
 * @param {number} parentSourceId - [object Object]
 * @param {string} qosType - [object Object]
 * @param {string} priority - [object Object]
 * @param {boolean} quiesce - [object Object]
 * @param {number} startTime_hour
 * @param {number} startTime_minute
 * @param {string} timezone - [object Object]
 * @param {number} fullProtectionSlaTimeMins - [object Object]
 * @param {number} incrementalProtectionSlaTimeMins - [object Object]
 * @param {boolean} enableIndexing - [object Object]
 * @param {Array/string} indexAllowPrefixes - [object Object]
 * @param {Array/string} indexDenyPrefixes - [object Object]
 * @param {boolean} performSourceSideDedup
 * @param {Array/string} alertingPolicy - [object Object]
 * @param {Array/string} alertEmails - [object Object]
 * @param {Array/string} includedPaths
 * @param {string} protectionType
 * @param {Array/string} excludedPaths
 */
//Auto generated script, cannot be modified !
System.getModule("com.cohesity.plugin.protectionJob").createNewProtectionJob(connection,protectionPolicy,viewBox,name,description,physicalMachine,virtualMachine,parentSourceId,qosType,priority,quiesce,startTime_hour,startTime_minute,timezone,fullProtectionSlaTimeMins,incrementalProtectionSlaTimeMins,enableIndexing,indexAllowPrefixes,indexDenyPrefixes,performSourceSideDedup,alertingPolicy,alertEmails,includedPaths,excludedPaths,protectionType) ;