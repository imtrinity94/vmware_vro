/**
 * Finds all Virtual Machine Templates in the vCenter inventory.
 * Iterates through all VMs and identifies those where config.template is true.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {VC:VirtualMachine[]} An array of VM template objects.
 */

var vms = VcPlugin.allVirtualMachines;
var templates = []; // templates will be stored into this array

for each (var vm in vms) {
    if (vm.config != null && vm.config.template) {
        templates.push(vm);
    }
}

// iterate over all found templates and print their names
for each (var t in templates) {
    System.log("template -> " + t.name);
}

return templates;
