/**
 * Removes Virtual Machine from the Protecion Job
 *
 * @param {CS:CohesityConnection} connection - [object Object]
 * @param {CS:VirtualMachine} vm - [object Object]
 * @param {CS:ProtectionJob} protectionJob - [object Object]
 * @return {CS:ProtectionJob} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.protectionJob").removeVMFromProtectionJob(connection,vm,protectionJob) ;