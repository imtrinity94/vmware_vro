/**
 * Get available disk
 *
 * @param {VC:HostSystem} host
 * @param {string} diskName
 * @return {Any} hostScsiDisk
 * @return {number} capacity
 */
var hostDSSystem = VcPlugin.toManagedObject( host, host.configManager.datastoreSystem );

var hScsiDisks = hostDSSystem.queryAvailableDisksForVmfs(null);
System.log("The Disk Name: "+diskName);
System.log("The host scsi disks length is: "+hScsiDisks.length);
for each (var disk in hScsiDisks){
	System.log("The disk display name: "+disk.displayName);
	if (diskName == disk.displayName){
		hostScsiDisk = disk;
		System.log("The disk name " + hostScsiDisk.canonicalName);
		System.log("The device path " + hostScsiDisk.devicePath);
		var disk_Capacity = hostScsiDisk.capacity;
		var capacityInGB = disk_Capacity.block * disk_Capacity.blockSize / 1073741824;
		System.log("The disk capacity " + capacityInGB + " GB");
		capacity = capacityInGB
		break;
		}
		
	}

if (!hostScsiDisk) {
	throw "No available disk with name " + diskName;
}