/**
 * Simple task with custom script capability.
 *
 * @param {VRA:Machine} machine
 * @return {VRA:RequestTracker} requestTracker
 */
var host = machine.host;

if(!host) {
     System.error("Host is missing for machine " + machine.name);
     throw new Error("Host is missing for machine " + machine.name)
}
 else {
    var machineService = host.createInfrastructureClient().createMachineService();
    requestTracker = machineService.deleteMachine(machine);
    System.log("Delete machine request has been successfully placed with request tracking id " + requestTracker.id);
}
