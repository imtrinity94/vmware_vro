// VMware vRealize Orchestrator action sample
//
// Update the notes for a vCenter VM
// 
// For vRO 7.0+
//
// Action Inputs:
// vm - VC:VirtualMachine - vCenter VM Object
// notes - string - New vCenter VM Notes
//
// Return type: string - Notes for VM

if (!vm) { throw "VM not provided" }
if (!notes) { notes = ""; }

var oldNotes = vm.summary.config.annotation;
if (!oldNotes) { oldNotes = ""; }

System.debug("Old VM Notes: "+oldNotes);
System.debug("New VM Notes: "+notes);

var configSpec = new VcVirtualMachineConfigSpec();
configSpec.annotation = notes;
// Start VM reconfigure task
var task = vm.reconfigVM_Task(configSpec);
// Wait for task to end
var progress = false;
var pollRate = 5;
System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(task,progress,pollRate) ;
