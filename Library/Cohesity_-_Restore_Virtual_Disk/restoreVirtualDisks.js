/**
 * Return the host type of the virtual machine.
 *
 * @param {CS:CohesityConnection} cohesityCluster - [object Object]
 * @param {CS:ObjectResource} backupCandidate - [object Object]
 * @param {CS:SnapshotVersion} snapshot - [object Object]
 * @param {CS:ProtectionJobNameResource} protectionJobResource - [object Object]
 * @param {Array/CS:VirtualDiskInformation} virtualDisks - [object Object]
 * @param {string} restoreFrom - [object Object]
 * @param {boolean} advancedConfig - [object Object]
 * @param {boolean} powerOffVmBeforeRecovery - [object Object]
 * @param {boolean} powerOnVmAfterRecovery - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.cohesity.plugin.dev.protection.vmware").restoreVirtualDisks(cohesityCluster,backupCandidate,snapshot,protectionJobResource,virtualDisks,restoreFrom,advancedConfig,powerOffVmBeforeRecovery,powerOnVmAfterRecovery) ;