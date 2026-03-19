/**
 * Returns All Protection Jobs Which are protecting the given VM
 *
 * @param {CS:CohesityConnection} connection - [object Object]
 * @param {VC:VirtualMachine} vm - [object Object]
 * @return {Array/CS:ProtectionJob} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.protectionJob").getAllNonDeletedProtectionJobObjectsforVM(connection,vm) ;