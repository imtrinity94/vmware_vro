/**
 * Get the status of the last run for the protection job
kFailure - Backup Failed
kSuccess - Backup Successful
kAccepted - In Progress
 *
 * @param {CS:CohesityConnection} cluster - [object Object]
 * @param {CS:ProtectionJob} pJob - [object Object]
 * @param {number} sourceId - [object Object]
 * @return {CompositeType(status:string,message:string):runStatus} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.protectionJob").getLastRunStatus(cluster,pJob,sourceId) ;