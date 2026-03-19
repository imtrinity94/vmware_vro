/**
 * Compute disk partition
 *
 * @param {VC:HostSystem} host
 * @param {Any} hostScsiDisk
 * @param {number} capacity
 * @param {Any} vmfsDatastoreOption
 */
var hostStorageSystem = VcPlugin.toManagedObject( host, host.configManager.storageSystem );
var layout = vmfsDatastoreOption.info.layout;
System.log("Disk total number of blocks " + layout.total.block);
System.log("Disk block size " + layout.total.blockSize);
var numberOfBlocks = Math.floor((capacity * 1073741824) / layout.total.blockSize);
System.log("Number of blocks required for the new partition " + numberOfBlocks);
if (numberOfBlocks > layout.total.block) {
	throw "The number of blocks reqiuired for "+ capacity +" GB is greater then the total number of disk blocks!";
}
var partitionFormat = vmfsDatastoreOption.spec.partition.partitionFormat;
System.log("Partition format " + partitionFormat);
var hostDiskPartitionInfo = hostStorageSystem.computeDiskPartitionInfo(hostScsiDisk.devicePath, layout , partitionFormat);
vmfsDatastoreOption.spec.partition = hostDiskPartitionInfo.spec;
