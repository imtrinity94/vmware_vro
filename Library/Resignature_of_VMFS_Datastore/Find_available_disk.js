/**
 * Find available disk
 *
 * @param {VC:HostSystem} host
 * @param {string} diskName
 * @return {Any} hostScsiDisk
 * @return {number} capacity
 */
var hostDatastoreSystem = VcPlugin.toManagedObject( host, host.configManager.datastoreSystem );

var hostScsiDisks = hostDatastoreSystem.queryAvailableDisksForVmfs(null);
System.log(diskName);
System.log(hostScsiDisks.length);
for each (var disk in hostScsiDisks){
	System.log(disk.displayName);
	if (diskName == disk.displayName){
		hostScsiDisk = disk;
		System.log("Disk name " + hostScsiDisk.canonicalName);
		System.log("Device path " + hostScsiDisk.devicePath);
		var diskCapacity = hostScsiDisk.capacity;
		var capacityGB = diskCapacity.block * diskCapacity.blockSize / 1073741824;
		System.log("Disk capacity " + capacityGB + " GB");
		capacity = capacityGB
		break;
		}
		
	}

if (!hostScsiDisk) {
	throw "There is no available disk with name " + diskName;
}