/**
 * Simple task with custom script capability.
 *
 * @param {boolean} purge
 * @param {boolean} forceDelete
 * @param {VRA:BlockDevice} blockDevice
 * @return {VRA:RequestTracker} requestTracker
 */
var diskService = blockDevice.host.createInfrastructureClient().createDiskService();
requestTracker = diskService.deleteBlockDevice(blockDevice.id, purge, forceDelete);
System.log("Delete disk request has been successfully placed with request tracking id " + requestTracker.id);
