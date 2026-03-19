/**
 * configureReplicationToVc
 *
 * @param {VR:VcRemoteSite} remoteSite
 * @param {VC:VirtualMachine} vm
 * @param {VR:RemoteDatastore} datastore
 * @param {number} rpo
 * @param {boolean} quiesceGuestEnabled
 * @param {boolean} networkCompressionEnabled
 * @param {boolean} enableMPIT
 * @param {number} instancesPerDay
 * @param {number} numDays
 * @param {boolean} useDefaultSeed
 * @param {VR:DiskType} diskType
 * @param {VR:StorageProfile} storageProfile
 * @param {boolean} encryptionEnabled
 * @param {boolean} perDisk
 * @param {Array/VR:VmDisk} includedDisks
 * @param {Array/VR:VmDisk} excludedDisks
 * @param {Array/VR:DiskType} diskTypes
 * @param {Array/VR:StorageProfile} storageProfiles
 * @param {Array/VR:RemoteDatastore} datastores
 * @param {boolean} autoReplicateNewDisks
 * @param {boolean} dataSetsReplicationEnabled
 * @return {VR:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vr.configure").configureReplicationToVc(remoteSite,vm,datastore,rpo,quiesceGuestEnabled,networkCompressionEnabled,enableMPIT,instancesPerDay,numDays,useDefaultSeed,diskType,storageProfile,encryptionEnabled,perDisk,includedDisks,excludedDisks,diskTypes,storageProfiles,datastores,autoReplicateNewDisks,dataSetsReplicationEnabled);
