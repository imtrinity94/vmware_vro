/**
 * Registers a vRealize Automation (vRA) machine as a node in Chef.
 * Retrieves machine properties to determine the Chef environment and role.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VCAC:VcacHost} vCloudAutomationHost - The IaaS host object.
 * @param {VCAC:VirtualMachine} vCloudVirtualMachine - The IaaS machine to register.
 * @returns {void}
 */
function registerMachineInChef(iaasHost, iaasMachine) {
    System.log("Starting Chef registration for node: " + iaasMachine.virtualMachineName);
    
    var ChefLibraryProvider = System.getModule("com.vmware.pscoe.example.chef").Chef();
    var chefClientObj = new ChefLibraryProvider();
    
    var nodeNameStr = iaasMachine.virtualMachineName;
    var chefClientHandle = chefClientObj.createClient(nodeNameStr);
    
    // Retrieve vRA VM custom properties for Chef metadata
    var vmPropertiesMap = System.getModule("com.vmware.pscoe.library.vra.iaas").getVirtualMachineProperties(iaasHost, iaasMachine.getEntity());
    var chefEnvStr = vmPropertiesMap.get("Chef.Environment");
    var chefRoleStr = vmPropertiesMap.get("Chef.Role");
    
    if (!chefEnvStr || !chefRoleStr) {
        System.error("Missing mandatory Chef properties (Environment: " + chefEnvStr + ", Role: " + chefRoleStr + ") for node: " + nodeNameStr);
        return;
    }

    System.log("Provisioning Chef Node: " + nodeNameStr + " in Environment: " + chefEnvStr);
    var chefNodeObj = chefClientObj.createNode(nodeNameStr, chefEnvStr, chefClientHandle.private_key);
    
    chefNodeObj.addRole(chefRoleStr);
    chefNodeObj.save();
    
    System.log("Chef Node registration successful for " + nodeNameStr);
}

// Action execution entry point
registerMachineInChef(vCloudAutomationHost, vCloudVirtualMachine);

return null;
