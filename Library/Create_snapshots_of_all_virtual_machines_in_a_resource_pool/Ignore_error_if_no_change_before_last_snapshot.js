/**
 * Ignore error if no change before last snapshot
 *
 * @param {VC:VirtualMachine} activeVM
 * @param {string} errorCode
 */
// Ignore error if no change before last snapshot
if (errorCode == "Task 'CreateSnapshot_Task' error: Snapshot not taken since the state of the virtual machine has not changed since the last snapshot operation. (Dynamic Script Module name : vim3WaitTaskEnd#20)") {
	System.warn("Virtual machine '" + activeVM.name + "': Snapshot not taken since the state of the virtual machine has not changed since the last snapshot operation.");
} else {
	throw errorCode;
}