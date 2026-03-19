/**
 * Returns the annotation (notes) text from a vCenter virtual machine's
 * summary configuration.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine} vm The vCenter virtual machine object from which to read notes.
 * @returns {string} The annotation/notes string for the virtual machine.
 */

if (!vm || !vm.summary || !vm.summary.config) {
    return "";
}

return vm.summary.config.annotation || "";
