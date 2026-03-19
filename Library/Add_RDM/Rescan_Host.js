/**
 * Rescan Host
 *
 * @param {VC:VirtualMachine} VM
 */
var host = VcPlugin.convertToVimManagedObject(VM, VM.runtime.host);
System.log("rescanning HBAs on host '" + host.name + "'... please wait...");
try {
	var storageSystem = VcPlugin.convertToVimManagedObject(host, host.configManager.storageSystem);
	task = storageSystem.rescanAllHba();
	task = storageSystem.rescanVmfs();
	task = storageSystem.refreshStorageSystem();
	System.log("rescanning HBAs on host '" + host.name + "' completed successfully.");
}
catch (ex) {
	System.error("Error when rescanning VMFS. Reason: " + ex);
	throw("Error when rescanning VMFS. Reason: " + ex);
}