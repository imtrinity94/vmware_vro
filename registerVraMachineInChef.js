/**
* Register a vRA machine as a node in Chef
* @param {VCAC:VcacHost} host - IaaS host
* @param {VCAC:VirtualMachine} machine - IaaS machine to register as node in Chef
*/
function registerMachineInChef(host, machine) {
    var Chef = System.getModule("com.vmware.pscoe.example.chef").Chef()
    var chef = new Chef();
    var client = chef.createClient(machine.virtualMachineName);
    var machineProperties = System.getModule("com.vmware.pscoe.library.vra.iaas").getVirtualMachineProperties(host, machine.getEntity());
    var environment = machineProperties.get("Chef.Environment");
    var role = machineProperties.get("Chef.Role");
    var node = chef.createNode(machine.virtualMachineName, environment, client.private_key);
    node.addRole(role);
    node.save();
};
