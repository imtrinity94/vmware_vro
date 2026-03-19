/**
 * Returns the last protection run instance for a group.
 *
 * @param {CS:CohesityConnection} connection - [object Object]
 * @param {CS:ProtectionJob} protectionGroup - [object Object]
 * @param {number} sourceId - [object Object]
 * @return {CS:ProtectionRun} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.protectionJob").getLastProtectionRun(connection,protectionGroup,sourceId) ;