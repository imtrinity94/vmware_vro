/**
 * Validate & SetParams
 *
 * @param {CS:SnapshotVersion} snapshots - [object Object]
 * @param {CS:ProtectionJobNameResource} protectionJob - [object Object]
 * @param {CS:ObjectResource} backupCandidate - [object Object]
 * @param {CS:CohesityConnection} connection - [object Object]
 * @param {Array/CS:VirtualDiskInformation} virtualDisks - [object Object]
 * @return {string} jobName - [object Object]
 */
if (!backupCandidate || !snapshots || !protectionJob || !connection || !virtualDisks) {
    throw "Invalid request. Required params are missing.";
}

if (virtualDisks.length == 0) {
    throw "No Disks specified.";
}

System.log("Getting workflow parameters");
/*
Get the variables from the input
*/
var vmname = backupCandidate.displayName;

var runtime = new Date();
var jobNameSuffix = System.formatDate(runtime, "MM/dd/yy:HH:mm");
var jobName = 'RecoverDisk: ' + vmname + "-" + jobNameSuffix;

// Dump the values to System.log
System.log("Job name is " + jobName);