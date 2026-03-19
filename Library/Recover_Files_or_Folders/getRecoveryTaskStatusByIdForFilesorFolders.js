/**
 * Get Recovery Task status by Id
 *
 * @param {number} recoveryJobId - [object Object]
 * @param {CS:CohesityConnection} connection - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.protectionSources").getRecoveryTaskStatusByIdForFilesorFolders(recoveryJobId,connection) ;