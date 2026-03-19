/**
 * @description Returns the annotation (notes) text from a vCenter virtual machine's
 *              summary configuration.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {VC:VirtualMachine} vm - The vCenter virtual machine object from which to read notes.
 * @returns {string} The annotation/notes string for the virtual machine.
 */

// VMware vRealize Orchestrator action sample
// Return the notes for a vCenter VM
// For vRO 7.0+
// Action Inputs:
// vm - VC:VirtualMachine - vCenter VM Object
// Return type: string - Notes for VM

return vm.summary.config.annotation;
