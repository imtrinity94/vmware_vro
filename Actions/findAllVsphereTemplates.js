/**
 * Finds all Virtual Machine Templates in the vCenter inventory.
 * Iterates through all VMs and identifies those where config.template is true.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {VC:VirtualMachine[]} templateVmsList - An array of VM template objects.
 */

var allVms = VcPlugin.allVirtualMachines;
var templateVmsList = [];

var i;
for (i = 0; i < allVms.length; i++) {
    var vmObj = allVms[i];
    if (vmObj.config != null && vmObj.config.template) {
        templateVmsList.push(vmObj);
    }
}

// Log found templates
var j;
for (j = 0; j < templateVmsList.length; j++) {
    System.log("Found Template: " + templateVmsList[j].name);
}

return templateVmsList;
