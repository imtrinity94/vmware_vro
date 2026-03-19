/**
 * reconfigure Replication
 *
 * @param {VR:RemoteDatastore} datastore
 * @param {number} rpo
 * @param {Array/VR:VmDisk} includedDisks
 * @param {Array/VR:VmDisk} excludedDisks
 * @param {boolean} useDefaultDiskSeed
 * @param {number} instancesPerDay
 * @param {boolean} enableMPIT
 * @param {boolean} networkCompressionEnabled
 * @param {VR:VrReplicationDetailsData} replicationData
 * @param {boolean} quiesceGuestEnabled
 * @param {VR:VcToVcSourceGroup} vcGroup
 * @param {number} numDays
 * @param {VR:DiskType} diskType
 * @param {VR:StorageProfile} diskProfile
 * @param {boolean} encryptionEnabled
 * @param {boolean} perDisk
 * @param {Array/VR:DiskType} diskTypes
 * @param {Array/VR:StorageProfile} diskProfiles
 * @param {Array/VR:RemoteDatastore} datastores
 * @param {boolean} autoReplicateNewDisks
 * @param {boolean} dataSetsReplicationEnabled
 * @return {VR:Task} task
 */
var settings = new VRReplicationSettings();

settings.setName(vcGroup.name);
settings.setReplicationRef(replicationData.getReplicationRef());
settings.setPerDiskEnabled(perDisk);
settings.setIncludedDisks(includedDisks);
settings.setExcludedDisks(excludedDisks);
settings.setIncludeAllDisks(excludedDisks.length == 0);
settings.setDiskType(diskType);
settings.setDiskTypes(diskTypes);
settings.setStorageProfile(diskProfile);
settings.setStorageProfiles(diskProfiles);
settings.setRemoteDatastore(datastore);
settings.setRemoteDatastores(datastores);
settings.setUseDefaultSeed(useDefaultDiskSeed);
settings.setRpo(rpo);
settings.setMpitEnabled(enableMPIT);
settings.setMpitInstances(instancesPerDay);
settings.setMpitDays(numDays);
settings.setEncryptionEnabled(encryptionEnabled);
settings.setQuiesceGuestEnabled(quiesceGuestEnabled);
settings.setNetworkCompressionEnabled(networkCompressionEnabled);
settings.setAutoReplicateNewDisks(autoReplicateNewDisks);
settings.setDataSetsReplicationEnabled(dataSetsReplicationEnabled);

if (enableMPIT) {
	var retentionPolicyTier = new VRRetentionPolicyTier();
	retentionPolicyTier.granularityMinutes = Math.floor((24/instancesPerDay)*60);
	retentionPolicyTier.numSlots = numDays * instancesPerDay;
	settings.retentionPolicyTiers = [retentionPolicyTier];
}

var task = vcGroup.reConfigureReplicationTo(settings);