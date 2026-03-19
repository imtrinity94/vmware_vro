/**
 * Find available disk
 *
 * @param {VC:HostSystem} host
 * @param {string} diskName
 * @param {number} capacity
 * @return {Any} hostScsiDisk
 */
var hostDatastoreSystem = VcPlugin.toManagedObject( host, host.configManager.datastoreSystem );

var hostScsiDisks = hostDatastoreSystem.queryAvailableDisksForVmfs(null);

for each (var disk in hostScsiDisks){
	if (diskName == disk.displayName){
		hostScsiDisk = disk;
		System.log("Disk name " + hostScsiDisk.displayName);
		System.log("Device path " + hostScsiDisk.devicePath);
		var diskCapacity = hostScsiDisk.capacity;
		var capacityGB = diskCapacity.block * diskCapacity.blockSize / 1073741824;
		System.log("Disk capacity " + capacityGB + " GB - requested capacity " + capacity + " GB");
		if (capacity > capacityGB) {
			throw "The specified datastore capacity is greater than the maximum available on the disk!";
		}
		break;
	}
}

if (!hostScsiDisk) {
	throw "There is no available disk with name " + diskName;
}