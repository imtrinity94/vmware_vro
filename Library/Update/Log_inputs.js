/**
 * Log the input text to the console log with level 'log'
 *
 * @param {vCAC:VirtualMachine} vCACVm
 * @param {VC:VirtualMachine} vCenterVm
 * @param {vCAC:Entity} virtualMachineEntity
 * @param {vCAC:VCACHost} vCACHost
 * @param {string} externalWFStub
 * @param {Properties} vCACVmProperties
 */
/*if (vCACHost != null && vCACHost != undefined) {
	System.log("Workflow started from the workflow stub " + externalWFStub + " on vRA host " + vCACHost.displayName);
} else {
	System.warn("vRA host is not initialized.");
}*/

if (vCACVm != null && vCACVm != undefined) {
	System.log("Got vRA VM: " + vCACVm.virtualMachineName);
} else {
	throw "vRA VM is not initialized.";
}

/*if (virtualMachineEntity != null && virtualMachineEntity != undefined) {
	System.log("Matching virtual machine entity " + virtualMachineEntity.keyString);
} else {
	System.warn("vRA VM entity is not initialized.");
}*/

/*if (vCenterVm != null && vCenterVm != undefined) {
	System.log("Got vCenter VM " + vCenterVm.name);
} else {
	System.warn("vCenter VM is not initialized.");
}*/

if (vCACVmProperties == null || vCACVmProperties == undefined) {
	throw "vRA VM properties is not initialized.";
}

var text = "vRA VM properties:";

var array = new Array();

for each (var key in vCACVmProperties.keys) {
	if (key == "VirtualMachine.Password")
		continue;
	array.push(key + ": " + vCACVmProperties.get(key));	
}

array.sort();

for each (var line in array) {
	text += "\n\t" + line;
}

System.log(text);
