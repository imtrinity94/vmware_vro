// VMware vRealize Orchestrator action sample
//
// Return the notes for a vCenter VM
// 
// For vRO 7.0+
//
// Action Inputs:
// vm - VC:VirtualMachine - vCenter VM Object
//
// Return type: string - Notes for VM

return vm.summary.config.annotation;
