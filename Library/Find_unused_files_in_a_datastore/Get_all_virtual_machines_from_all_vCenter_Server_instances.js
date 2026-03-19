/**
 * Get all virtual machines from all vCenter Server instances
 *
 * @param {Properties} vmFiles
 * @return {Properties} vmFiles
 * @return {boolean} orphanedFound
 */
var vcs = VcPlugin.allSdkConnections;
var allVms = new Array();
orphanedFound = false;
for each (var vc in vcs) {
	var vms = vc.getAllVirtualMachines();
	allVms = allVms.concat(vms);
}

for each (var vm in allVms) {
	// remove config file from vmFiles
	try {
		var filename = vm.config.files.vmPathName;
		vmFiles.remove(filename);
	}
	catch (ex) {
		continue;
	}
}
if(vmFiles){
	orphanedFound=true;
	System.log("The following virtual machines could be deleted:");
	for (var x in vmFiles) {
		System.log("- " + x);
	}
}
