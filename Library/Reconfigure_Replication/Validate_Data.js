/**
 * Validate Data
 *
 * @param {Array/VR:VmDisk} includedDisks
 * @param {Array/VR:VmDisk} excludedDisks
 * @param {VR:VrReplicationDetailsData} replicationData
 * @param {boolean} useDefaultDiskSeed
 * @param {boolean} quiesceGuestEnabled
 * @param {number} rpo
 * @param {boolean} enableMPIT
 * @param {VR:RemoteDatastore} datastore
 * @param {boolean} networkCompressionEnabled
 * @param {number} instancesPerDay
 * @param {number} numDays
 */
var numSelectedDisks = includedDisks.length +  excludedDisks.length;
if (numSelectedDisks != replicationData.getOriginalVmDisks().length) {
   throw "Validation failed. Some Virtual Machine Disks are not added as included or excluded. Add all disks and try again.";
}
