/**
 * Rename VM
 *
 * @param {VC:VirtualMachine} vm
 * @param {string} newName
 * @return {VC:Task} task
 */
try {
	task = vm.rename_Task(newName);
}
catch (ex) {
	System.error("Error when renaming VM. Reason: " + ex);
	Server.error("Error when renaming VM. Reason: " + ex);
	tmpErrorMessage = "Error when renaming VM. Reason: " + ex;
}