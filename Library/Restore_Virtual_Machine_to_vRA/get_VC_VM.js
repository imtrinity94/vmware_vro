/**
 * get VC:VM
 *
 * @param {string} machinePrefix - [object Object]
 * @param {string} machineSuffix - [object Object]
 * @param {string} vmname - [object Object]
 * @return {VC:VirtualMachine} vcVM - [object Object]
 */
var restoredMachineName = vmname;

if (machineSuffix) {
	restoredMachineName = restoredMachineName + machineSuffix;
}

if (machinePrefix) {
	restoredMachineName = machinePrefix + restoredMachineName;
}

vcVM = System.getModule("com.cohesity.plugin.vmware").getVirtualMachineByName(restoredMachineName);

if (!vcVM) {
	throw "[Error] Unable to find the restored VM instance in vCenter.";
}