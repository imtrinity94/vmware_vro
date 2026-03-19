/**
 * createRecoveryPlan
 *
 * @param {SRM:RecoveryFolder} recoveryFolder
 * @param {string} name
 * @param {string} description
 * @param {Array/SRM:ProtectionGroup} groups
 * @return {SRM:RecoveryPlan} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.srm.plan").createRecoveryPlan(recoveryFolder,name,description,groups) ;