/**
 * Simple task with custom script capability.
 *
 * @param {VRA:Machine} machine
 * @param {VRA:Host} host
 * @param {string} flavor
 * @param {number} cpuCount
 * @param {number} coreCount
 * @param {number} memory
 * @param {boolean} rebootMachine
 * @param {boolean} isResizeByFlavor
 * @return {VRA:RequestTracker} requestTracker
 */
var host = machine.host;

if(!host) {
     System.error("Host is missing for machine " + machine.name);
     throw new Error("Host is missing for machine " + machine.name)
}
 else {
    var machineService = host.createInfrastructureClient().createMachineService();
    if(isResizeByFlavor){
        requestTracker = machineService.resize(machine.id,flavor,null,null,null,rebootMachine);
    }else{
        requestTracker = machineService.resize(machine.id,null,cpuCount,memory,coreCount,rebootMachine);
    }
    System.log("Resize machine request has been successfully placed with request tracking id " + requestTracker.id);
}
