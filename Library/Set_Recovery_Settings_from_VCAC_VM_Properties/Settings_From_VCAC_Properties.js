/**
 * Settings From VCAC Properties
 *
 * @param {Properties} vCACVmProperties
 * @param {SRM:RecoveryPriority} pg1
 * @param {SRM:RecoveryPriority} pg2
 * @param {SRM:RecoveryPriority} pg3
 * @param {SRM:RecoveryPriority} pg4
 * @param {SRM:RecoveryPriority} pg5
 * @param {SRM:VirtualMachinePowerState} psOn
 * @param {SRM:VirtualMachinePowerState} psOff
 * @return {SRM:RecoveryPriority} priorityGroup
 * @return {SRM:VirtualMachinePowerState} powerState
 * @return {string} commandName
 * @return {number} commandTimeout
 * @return {boolean} commandRunInRecoveredVm
 * @return {string} commandText
 * @return {boolean} commandIsPrePowerOnStep
 */
/* Copyright (c) 2014-2024 Broadcom. All Rights Reserved. Broadcom Confidential. The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries. */

var pname = "Priority 3";
var pstate = "poweredOn";

/*pre-power on command */
var cmd = {
	"name" : "",
	"command" : "",
	"timeout" : 300,
	"isPre" : false
};

if (vCACVmProperties != null) {
	try {
		pname = vCACVmProperties.get("VMware.SRM.Priority");
		System.debug("VMware.SRM.Priority = " + pname);
	} catch (e) {
		System.log(e);
	}

	try {
		pstate = vCACVmProperties.get("VMware.SRM.PowerState");
		System.debug("VMware.SRM.PowerState = " + pstate);
	} catch (e) {
		System.log(e);
	}
	try {
		cmd.command = vCACVmProperties.get("VMware.SRM.Cmd");
		cmd.name = vCACVmProperties.get("VMware.SRM.Cmd.Name");
		cmd.timeout = vCACVmProperties.get("VMware.SRM.Cmd.Timeout");
		cmd.onVM = vCACVmProperties.get("VMware.SRM.Cmd.OnVM");
	} catch (e) {
		System.log(e);
	}
}

System.debug("Priority text input = " + pname)
switch (pname) {
	case "Priority 1": priorityGroup = pg1;
	break;
	case "Priority 2": priorityGroup = pg2;
	break;
	case "Priority 3": priorityGroup = pg3;
	break;
	case "Priority 4": priorityGroup = pg4;
	break;
	case "Priority 5": priorityGroup = pg5;
	break;
	default : priorityGroup = pg3;
}
System.debug("Priority selected = " + priorityGroup.name);

System.debug("Power State text input = " + pstate)
switch (pstate) {
	case "poweredOn": powerState = psOn;
	break;
	case "On": powerState = psOn;
	break;
	case "poweredOff": powerState = psOff;
	break;
	case "Off": powerState = psOff;
	break;
	default : powerState = psOn;
}
System.debug("Power State selected = " + powerState.name);

commandText = cmd.command || "";
commandName = cmd.name || "";
commandTimeout = cmd.timeout;
commandRunInRecoveredVm = cmd.onVM;
commandIsPrePowerOnStep = (! cmd.onVM) || cmd.isPre;