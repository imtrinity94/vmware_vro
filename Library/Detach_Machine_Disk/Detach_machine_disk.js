/**
 * Simple task with custom script capability.
 *
 * @param {VRA:Machine} machine
 * @param {VRA:BlockDevice} blockDevice
 * @return {VRA:RequestTracker} requestTracker
 */
var host = blockDevice.host;
var machineService = host.createInfrastructureClient().createMachineService()
if(blockDevice.blockDeviceStatus == "ATTACHED"){
    requestTracker = machineService.detachMachineDisk(machine.id, blockDevice.id);
    System.log("Disk detach request for disk " + blockDevice.name + " has been successfully placed with request tracker id " + requestTracker.id)
}
else {
    throw "Disk should be in attached state"
}


