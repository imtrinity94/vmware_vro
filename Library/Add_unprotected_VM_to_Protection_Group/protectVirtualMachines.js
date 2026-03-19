/**
 * Add Virtual machines to existing job or create a new job to protect them.
 *
 * @param {CS:CohesityConnection} cluster - [object Object]
 * @param {Array/CS:VirtualMachine} virtualMachines - [object Object]
 * @param {Array/CS:Node} vmTags - [object Object]
 * @param {CS:ProtectionJob} protectionJob - [object Object]
 * @param {boolean} createNewJob - [object Object]
 * @param {string} name - [object Object]
 * @param {string} description - [object Object]
 * @param {CS:ProtectionPolicy} protectionPolicy - [object Object]
 * @param {CS:ViewBox} viewBox - [object Object]
 * @param {string} qosType - [object Object]
 * @param {string} priority - [object Object]
 * @param {boolean} quiesce - [object Object]
 * @param {string} startTime - [object Object]
 * @param {string} timezone - [object Object]
 * @param {number} fullProtectionSlaTimeMins - [object Object]
 * @param {number} incrementalProtectionSlaTimeMins - [object Object]
 * @param {boolean} enableIndexing - [object Object]
 * @param {Array/string} indexAllowPrefixes - [object Object]
 * @param {Array/string} indexDenyPrefixes - [object Object]
 * @param {boolean} performSourceSideDedup
 * @param {Array/string} alertingPolicy - [object Object]
 * @param {Array/string} alertEmails - [object Object]
 * @param {Array/CS:VirtualDisk} excludedDisks - [object Object]
 * @param {boolean} allowDuplicates - [object Object]
 * @return {CS:ProtectionJob} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.dev.workflows").protectVirtualMachines(cluster,virtualMachines,vmTags,protectionJob,createNewJob,name,description,protectionPolicy,viewBox,qosType,priority,quiesce,startTime,timezone,fullProtectionSlaTimeMins,incrementalProtectionSlaTimeMins,enableIndexing,indexAllowPrefixes,indexDenyPrefixes,performSourceSideDedup,alertingPolicy,alertEmails,excludedDisks,allowDuplicates) ;