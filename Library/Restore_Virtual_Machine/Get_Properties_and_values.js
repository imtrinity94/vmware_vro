/**
 * Get Properties and values
 *
 * @param {CS:SnapshotVersion} snapshots
 * @param {string} machinePrefix
 * @param {string} machineSuffix
 * @param {CS:ObjectResource} backupCandidate - [object Object]
 * @param {CS:ProtectionJobNameResource} protectionJob - [object Object]
 * @return {string} jobName
 * @return {number} jobRunId
 * @return {number} protectionJobId
 * @return {number} protectionSourceId
 * @return {string} vmname
 * @return {number} startedTimeUsecs - [object Object]
 * @return {number} clusterId - [object Object]
 * @return {number} clusterIncarnationId - [object Object]
 */
try {
    System.log("**********");
    System.log("Getting workflow parameters");
    System.log("**********");
    /*
    Get the variables from the input
    */
    var vmname = backupCandidate.displayName;
    var protectionSourceId = backupCandidate.id;

	// Protection job related.
    var protectionJobId = protectionJob.id;
	var clusterId = protectionJob.jobUid.clusterId;
	var clusterIncarnationId = protectionJob.jobUid.clusterIncarnationId;
	// Snapshot related
    var jobRunId = snapshots.jobRunId;
  	var startedTimeUsecs = snapshots.startedTimeUsecs;
  
	var runtime = new Date();
    var jobNameSuffix = System.formatDate(runtime, "MM/dd/yy:HH:mm:ss");
    var jobName = backupCandidate.displayName + "~restore~" + jobNameSuffix;
  
    // Dump the values to System.log
    System.log("protectionSourceId is " + protectionSourceId);
    System.log("protectionJobId is " + protectionJobId);
    System.log("jobRunId is " + jobRunId);
    System.log("jobName is " + jobName);
    System.log("vmname is " + vmname);
    System.log("**********");


} catch (err) {
    throw "The restore failed with error " + err;
}