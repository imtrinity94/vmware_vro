/**
 * Attach disk to machine
 *
 * @param {VRA:Machine} machine
 * @param {VRA:BlockDevice} blockDevice
 * @param {string} unitNumber
 * @param {string} scsiController
 * @param {Properties} diskAttachmentProperties
 * @return {VRA:RequestTracker} requestTracker
 */
if(blockDevice.blockDeviceStatus != "AVAILABLE"){	
    throw "Disk should be in available state"
}
var machineService = machine.host.createInfrastructureClient().createMachineService();
var diskAttachmentSpecification = new VraDiskAttachmentSpecification();
diskAttachmentSpecification.name = blockDevice.name;
diskAttachmentSpecification.description = blockDevice.description;
diskAttachmentSpecification.unitNumber = unitNumber;
diskAttachmentSpecification.blockDeviceId = blockDevice.id;
diskAttachmentSpecification.scsiController = scsiController;
for(var key in diskAttachmentProperties){
    diskAttachmentSpecification.putDiskAttachmentPropertiesItem(key, diskAttachmentProperties[key])
}
requestTracker = machineService.attachMachineDisk(diskAttachmentSpecification, machine.id);
System.log("Attach machine disk request for device - " + blockDevice.name + ", machine - " + machine.name + " has been successfully placed with request tracker id " + requestTracker.id)