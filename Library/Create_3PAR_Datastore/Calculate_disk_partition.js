/**
 * Calculate disk partition
 *
 * @param {VC:HostSystem} host
 * @param {Any} hostScsiDisk
 * @param {number} capacity
 * @param {Any} vmfsDatastoreOption
 */
var hostStorageSys = VcPlugin.toManagedObject( host, host.configManager.storageSystem );
var layout = vmfsDatastoreOption.info.layout;
System.log("Total number of blocks in Disk " + layout.total.block);
System.log("Block size of Disk" + layout.total.blockSize);
var numOfBlocks = Math.floor((capacity * 1073741824) / layout.total.blockSize);
System.log("Number of blocks required for the new partition " + numOfBlocks);
if (numOfBlocks > layout.total.block) {
	throw "Number of blocks reqiuired for "+ capacity +" GB is more then the total number of disk blocks";
}
var partitionFmt = vmfsDatastoreOption.spec.partition.partitionFormat;
System.log("The Partition format is " + partitionFmt);
var hDiskPartitionInfo = hostStorageSys.computeDiskPartitionInfo(hostScsiDisk.devicePath, layout , partitionFmt);
vmfsDatastoreOption.spec.partition = hDiskPartitionInfo.spec;