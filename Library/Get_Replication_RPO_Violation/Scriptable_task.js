/**
 * Scriptable task
 *
 * @param {VR:VcToVcSourceGroup} replication
 * @return {number} rpoViolationMinutes
 * @return {string} lastSyncTime
 * @return {number} lastSyncSizeBytes
 * @return {number} lastSyncDurationMillis
 * @return {number} currentRPO
 */
var replicationData = replication.getReplicationData();

rpoViolationMinutes = replicationData.getRpoViolationMinutes();
lastSyncTime = replicationData.getLastSyncTime();
lastSyncSizeBytes = replicationData.getLastSyncSize();
lastSyncDurationMillis = replicationData.getLastSyncDuration();
currentRPO = replicationData.getRPO();