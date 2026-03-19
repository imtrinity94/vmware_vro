/**
 * Returns the annotation (notes) text from a vCenter virtual machine's
 * summary configuration.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine} vcVirtualMachine The vCenter virtual machine object from which to read notes.
 * @returns {string} vmAnnotationNotes - The annotation/notes string for the virtual machine.
 */

if (!vcVirtualMachine || !vcVirtualMachine.summary || !vcVirtualMachine.summary.config) {
    System.warn("Virtual machine summary or config is unavailable for: " + (vcVirtualMachine ? vcVirtualMachine.name : "Unknown"));
    return "";
}

var vmAnnotationNotes = vcVirtualMachine.summary.config.annotation || "";

System.debug("Retrieved notes for VM " + vcVirtualMachine.name + ": " + vmAnnotationNotes);

return vmAnnotationNotes;
