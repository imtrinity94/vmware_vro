/**
 * Display inputs
 *
 * @param {vCAC:VirtualMachine} vCACVm
 * @param {VC:VirtualMachine} vCenterVm
 * @param {vCAC:Entity} virtualMachineEntity
 * @param {vCAC:VCACHost} vCACHost
 * @param {vCloud:VApp} vCloudVApp
 * @param {string} externalWFStub
 * @param {Properties} vCACVmProperties
 */
/* Copyright (c) 2014-2024 Broadcom. All Rights Reserved. Broadcom Confidential. The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries. */

System.log("Workflow started from workflow stub " + externalWFStub + " on vCAC host " + vCACHost.displayName);
System.log("Got vCAC virtual machine " + vCACVm.virtualMachineName);
System.log("Matching virtual machine entity " + virtualMachineEntity.keyString);

//If you do not get a vApp or VM it is likely that it is not accessible at the stage of the vCAC process
if (vCloudVApp != null) {
	System.log("Got vCloud vApp " + vCloudVApp.name);
}

if (vCenterVm != null) {
	System.log("Got vCloud VM " + vCenterVm.name);
}

//Displaying vCAC VM properties
if (vCACVmProperties != null) {
	var log = "";
	log += "vCAC VM properties :\n";
	var array = new Array();
	for each (var key in vCACVmProperties.keys) {
		array.push(key + " : " + vCACVmProperties.get(key));
	}
	array.sort();

	for each (var line in array) {
		log += "\t" + line + "\n";
	}
	System.log(log);
}