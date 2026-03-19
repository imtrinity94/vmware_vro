/**
 * Scriptable task
 *
 * @param {VR:VcToVcSourceGroup} replication
 * @return {number} mpitDays
 * @return {number} mpitInstances
 * @return {boolean} isMpitEnabled
 * @return {boolean} isNetworkCompression
 * @return {boolean} isQuiescingEnabled
 * @return {number} RPO
 * @return {string} status
 * @return {boolean} isEncryptionEnabled
 * @return {string} lastSyncTime
 * @return {number} lastSyncDuration
 * @return {number} lastSyncSize
 * @return {boolean} autoReplicateNewDisks
 * @return {boolean} isDataSetsReplicationEnabled
 */
replicationData = replication.getReplicationData();
mpitDays = replicationData.getMpitDays();
mpitInstances = replicationData.getMpitInstances();
isMpitEnabled = replicationData.isMpitEnabled();
isNetworkCompression = replicationData.isNetworkCompressionEnabled();
isQuiescingEnabled = replicationData.isQuiescingEnabled();
RPO = replicationData.getRPO();
status = replication.getStatus();
isEncryptionEnabled = replicationData.isEncryptionEnabled();
lastSyncTime = replicationData.getLastSyncTime();
lastSyncDuration = replicationData.getLastSyncDuration();
lastSyncSize = replicationData.getLastSyncSize();
autoReplicateNewDisks = replicationData.isAutoReplicateNewDisks();
isDataSetsReplicationEnabled = replicationData.isDataSetsReplicationEnabled();