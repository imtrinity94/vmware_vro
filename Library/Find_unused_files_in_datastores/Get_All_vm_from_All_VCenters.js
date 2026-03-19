/**
 * Get All vm from All VCenters
 *
 * @param {Properties} diskFiles
 * @param {Properties} vmFiles
 * @return {Properties} diskFiles
 * @return {Properties} vmFiles
 * @return {boolean} orphanedFound
 * @return {Array/VC:VirtualMachine} orphanedVMs
 */
var vcs = VcPlugin.allSdkConnections;
var allVms = new Array();
orphanedVMs = new Array();
orphanedFound = false;
for each (var vc in vcs) {
	var vms = vc.getAllVirtualMachines();
	allVms = allVms.concat(vms);
}

for each (var vm in allVms) {
	// remove config file from vmFiles
	try {
		var filename = vm.config.files.vmPathName;
		if(vm.summary.runtime.connectionState == VcVirtualMachineConnectionState.orphaned){
			orphanedVMs.push(vm);
		}
		vmFiles.remove(filename);
	}
	catch (ex) {
		try {
			System.error("Error getting files from VM '" + vm.name + "', exception : " + ex);
		}
		catch (subEx) {
			System.error("Error getting files from VM '" + vm.id + "', exception : " + ex);
		}
		continue;
	}
	
	// remove all disk files from disk files
	try {
		var devices = vm.config.hardware.device;
		for each(var device in devices) {
			if (device instanceof VcVirtualDisk) {
				try {
					var diskFilename = device.backing.fileName;
					diskFiles.remove(diskFilename);
				}
				catch (ex) {
					try {
						System.error("Error getting files from a disk from VM '" + vm.name + "', exception : " + ex);
					}
					catch (eex) {
						System.error("Error getting files from a disk from VM '" + vm.id + "', exception : " + ex);
					}
					continue;
				}
			}
		}
		
		
	}
	catch (ex) {
		try {
			System.error("Error getting devices from VM '" + vm.name + "', exception : " + ex);
		}
		catch (subEx) {
			System.error("Error getting devices from VM '" + vm.id + "', exception : " + ex);
		}
		continue;
	}
	
	var snapshots = System.getModule("com.vmware.library.vc.vm.snapshot").getAllSnapshotsOfVM(vm) ;
	if(snapshots.length>0){
		for each(var snapshotRef in snapshots){
			var snapshot = VcPlugin.convertToVimManagedObject(vm,snapshotRef);
			var snapshotDevices = snapshot.config.hardware.device;
			for each(var snapshotDevice in snapshotDevices) {
				if (snapshotDevice instanceof VcVirtualDisk) {
					try {
						var diskFilename = snapshotDevice.backing.fileName;
						diskFiles.remove(diskFilename);
					}
					catch (ex) {
						try {
							System.error("Error getting files from a disk from VM '" + vm.name + "', exception : " + ex);
						}
						catch (eex) {
							System.error("Error getting files from a disk from VM '" + vm.id + "', exception : " + ex);
						}
						continue;
					}
				}
			}
		}
	}
}
if(orphanedVMs.length>0){
	orphanedFound=true;
}
		