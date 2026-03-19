/**
 * Add a physical machine instance to a protection job.
 *
 * @param {CS:PhysicalMachine} machine
 * @param {CS:ProtectionJob} pJob
 * @param {CS:CohesityConnection} connection
 * @param {string} protectionType
 * @param {Array/string} paths
 * @param {Array/string} excludedPaths
 * @return {CS:ProtectionJob} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.protectionJob").addPhysicalMachineToProtectionJob(machine,pJob,connection,protectionType,paths,excludedPaths) ;