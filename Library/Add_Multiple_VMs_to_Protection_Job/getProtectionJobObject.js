/**
 * Returns Cohesoty Protection Job Object for given Protection Job Name
 *
 * @param {CS:CohesityConnection} connection - [object Object]
 * @param {string} protectionJobName - [object Object]
 * @return {CS:ProtectionJob} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.protectionJob").getProtectionJobObject(connection,protectionJobName) ;