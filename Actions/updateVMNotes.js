/**
 * Updates the notes (annotation) for a vCenter Virtual Machine.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine} vm The vCenter VM object.
 * @param {string} [notes] The new text for the VM notes. If omitted, notes are cleared.
 * @returns {void}
 */

if (!vm) { 
    throw "VM not provided"; 
}
if (!notes) { 
    notes = ""; 
}

var oldNotes = vm.summary.config.annotation;
if (!oldNotes) { 
    oldNotes = ""; 
}

System.debug("Old VM Notes: " + oldNotes);
System.debug("New VM Notes: " + notes);

var configSpec = new VcVirtualMachineConfigSpec();
configSpec.annotation = notes;

// Start VM reconfigure task
var task = vm.reconfigVM_Task(configSpec);

// Wait for task to end
var progress = false;
var pollRate = 5;
System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task, progress, pollRate);
