/**
 * Run Protection Job on demand for VC:Virtualmachines
 *
 * @param {CS:CohesityConnection} connection - [object Object]
 * @param {CS:ProtectionJob} protectionJob - [object Object]
 * @param {string} runType - [object Object]
 * @param {CS:VirtualMachine} virtualMachine - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.cohesity.plugin.dev.workflows").runOnDemandVMwareBackup(connection,protectionJob,runType,virtualMachine) ;