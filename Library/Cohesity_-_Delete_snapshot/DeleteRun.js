/**
 * DeleteRun
 *
 * @param {CS:SnapshotVersion} snapshots - [object Object]
 * @param {CS:ProtectionJobNameResource} protectionJob - [object Object]
 * @param {CS:CohesityConnection} connection - [object Object]
 * @param {boolean} deleteReplica - [object Object]
 */
//Delete a protection run identified by the start time.
CSProtectionSourceManager.deleteProtectionRun(
	connection,
	protectionJob.id,
	snapshots.startedTimeUsecs,
	deleteReplica ? true : false
);