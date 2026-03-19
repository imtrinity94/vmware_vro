/**
 * Registers a vRealize Automation (vRA) machine as a node in Chef.
 * Retrieves machine properties to determine the Chef environment and role.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VCAC:VcacHost} host The IaaS host object.
 * @param {VCAC:VirtualMachine} machine The IaaS machine to register.
 * @returns {void}
 */
function registerMachineInChef(host, machine) {
    var ChefModule = System.getModule("com.vmware.pscoe.example.chef").Chef();
    var chef = new ChefModule();
    var client = chef.createClient(machine.virtualMachineName);
    
    var machineProperties = System.getModule("com.vmware.pscoe.library.vra.iaas").getVirtualMachineProperties(host, machine.getEntity());
    var environment = machineProperties.get("Chef.Environment");
    var role = machineProperties.get("Chef.Role");
    
    var node = chef.createNode(machine.virtualMachineName, environment, client.private_key);
    node.addRole(role);
    node.save();
    
    System.log("Successfully registered machine '" + machine.virtualMachineName + "' in Chef environment '" + environment + "' with role '" + role + "'");
}

// Action execution
return registerMachineInChef(host, machine);
