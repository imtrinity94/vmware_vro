/**
 * setRecoverySettings
 *
 * @param {SRM:RecoveryPlan} plan
 * @param {VC:VirtualMachine} vm
 * @param {SRM:VirtualMachinePowerState} power
 * @param {SRM:RecoveryPriority} priority
 * @param {string} commandName
 * @param {string} commandText
 * @param {number} commandTimeout
 * @param {boolean} commandRunInRecoveredVm
 * @param {boolean} commandIsPrePowerOnStep
 * @param {string} promptName
 * @param {string} promptText
 * @param {boolean} promptIsPrePowerOnStep
 */
//Auto generated script, cannot be modified !
System.getModule("com.vmware.library.srm.protect.config").setRecoverySettings(plan,vm,power,priority,commandName,commandText,commandTimeout,commandRunInRecoveredVm,commandIsPrePowerOnStep,promptName,promptText,promptIsPrePowerOnStep) ;