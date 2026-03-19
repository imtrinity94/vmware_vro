/**
 * Get Properties and values
 *
 * @param {string} subject
 * @param {string} jobStatus
 * @param {boolean} sendMailNotification
 * @param {string} folderonly
 * @param {string} snapshot
 * @param {string} filesorfoldersname
 * @param {string} recoverto
 * @param {string} userName
 * @param {string} vmname
 * @param {string} content
 * @param {CS:EmailConfiguration} mailConnection
 * @param {Array/string} recipients
 * @param {CS:ObjectResource} BackupCandidates
 * @param {CS:ProtectionJobNameResource} protectionJobs
 * @param {CS:FilesOrFoldersResource} FilesBackupCandidates
 * @param {CS:SnapshotVersion} fileSnapshots
 * @param {string} osType
 * @param {string} folderOnly
 * @param {string} userName
 * @param {SecureString} passWord
 * @return {string} formattedRecipients
 * @return {string} jobName
 * @return {string} snapshot
 * @return {number} jobRunId
 * @return {number} jobId
 * @return {number} clusterId
 * @return {number} clusterIncarnationId
 * @return {number} sourceId
 * @return {string} folderonly
 * @return {string} filesorfoldersname
 * @return {string} vmname
 * @return {number} targetParentSourceId
 * @return {number} startedTimeUsecs - [object Object]
 */
System.log("**********");
System.log("Getting workflow parameters");
System.log("**********");


/*
Get the variables from the input
*/
var runtime = new Date();

var vmname = BackupCandidates.displayName;
System.log("vmname is " + vmname);

var sourceId = BackupCandidates.id;
System.log("sourceId is " + sourceId);

var targetParentSourceId = BackupCandidates.parentId;
System.log("Target parent Source id " + targetParentSourceId);

var folderonly = folderOnly;
System.log("folderonly is " + folderonly);

var filesorfoldersname = FilesBackupCandidates.displayName;
System.log("filesorfoldersname is " + filesorfoldersname);

var jobId = protectionJobs.id;
System.log("jobId is " + jobId);

var clusterIncarnationId = FilesBackupCandidates.jobUid.clusterIncarnationId;
System.log("clusterIncarnationId is " + clusterIncarnationId);

var clusterId = FilesBackupCandidates.jobUid.clusterId;
System.log("clusterId is " + clusterId);

var jobRunId = fileSnapshots.jobRunId;
System.log("jobRunId is " + jobRunId);

var startedTimeUsecs = fileSnapshots.startedTimeUsecs;

var jobNameSuffix = System.formatDate(runtime, "MM/dd/yy:HH:mm:ss");

var jobName = "Recover-Files" + "_vRA_" + jobNameSuffix;
System.log("jobName is " + jobName);

var osType = osType;
System.log("osType " + osType);

var userName = userName;
System.log("username " + userName);

var snapshot = fileSnapshots.displayName;
System.log("snapshot " + snapshot);

System.log("recipients > " + recipients);
if (recipients && recipients.length > 0) {
	var formattedRecipients = recipients.join(", ");
} else {
	var formattedRecipients = null;
}

System.log("formattedRecipients " + formattedRecipients);
System.log("**********");