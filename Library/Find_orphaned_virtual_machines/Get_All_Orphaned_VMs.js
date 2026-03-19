/**
 * Get All Orphaned VMs
 *
 * @return {Array/VC:VirtualMachine} orphanList
 * @return {Array/string} emailContent
 */
// Get all Virtual Machines for all vCenter connections defined for this plugin
var allVms = VcPlugin.getAllVirtualMachines(new Array());
emailContent = new Array();
// Check to see if each Virtual Machine is orphaned
var orphans = new Array();
for (var i in allVms) {
	if (allVms[i].summary.runtime.connectionState == VcVirtualMachineConnectionState.orphaned) {
		emailContent.push("VM: " + allVms[i].name + " is an orphaned VM");
		orphans.push(allVms[i]);
		System.log( "VM: " + allVms[i].name + " is an orphaned VM");
		Server.log( "VM: " + allVms[i].name + " is an orphaned VM");
	}
}
orphanList = orphans;
if (emailContent.length == 0) {
	emailContent.push("No VMs were found in orphaned state");
	System.log("No VMs were found in orphaned state");
	Server.log("No VMs were found in orphaned state");
}

