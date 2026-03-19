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

var foundVMFSPartition = false;
for each (var blockRange in layout.partition) {
	if (blockRange.type == "vmfs") {
		var availableBlocks = blockRange.end.block - blockRange.start.block + 1;
		System.log("Partition total number of blocks " + availableBlocks);
		System.log("Partition block size " + blockRange.start.blockSize);

		// 1 GB = 2^30 = 1073741824 bytes
		var numberOfBlocks = Math.floor((capacity * 1073741824) / blockRange.start.blockSize);
		System.log("Number of blocks required for the new partition " + numberOfBlocks);
		System.log("Number of available blocks " + availableBlocks);
		if (numberOfBlocks > availableBlocks) {
		    if (numberOfBlocks > layout.total.block) {
				throw "The number of blocks reqiuired for "+ capacity +" GB is greater then the total number of available blocks!";
			} else {
			    System.warn("Looks like requested the capacity of the whole disk, but some space are needed for the datastore itself");
				System.warn("Available blocks on the disk " + layout.total.block);
				System.warn("Available blocks on the partition " + availableBlocks);
				numberOfBlocks = availableBlocks;
				System.warn("Partition will be created with " + availableBlocks + " blocks and "
				 + Math.floor((availableBlocks * blockRange.start.blockSize) / 1073741824) + " GB size");
			}
		}

		blockRange.end.block = blockRange.start.block + numberOfBlocks - 1;
		System.log("Partition start block " + blockRange.start.block);
		System.log("Partition end block " + blockRange.end.block);
		foundVMFSPartition =true;
		break;
	}
}
if(!foundVMFSPartition) {
	throw "No VMFS partition found on the specified disk!";
}

var partitionFormat = vmfsDatastoreOption.spec.partition.partitionFormat;
System.log("Partition format " + partitionFormat);
var hostDiskParitionInfo = hostStorageSystem.computeDiskPartitionInfo(hostScsiDisk.devicePath, layout , partitionFormat);

vmfsDatastoreOption.spec.partition = hostDiskParitionInfo.spec;