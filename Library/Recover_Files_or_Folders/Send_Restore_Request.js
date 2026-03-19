/**
 * Send Restore Request
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
 * @param {string} formattedRecipients
 * @param {string} recoverTo
 * @param {number} targetParentSourceId
 * @param {boolean} overwriteExistingFileOrFolder
 * @param {boolean} preserveAttributes
 * @param {CS:ProtectionJobNameResource} protectionJobs
 * @param {string} osType
 * @param {string} userName
 * @param {SecureString} passWord
 * @param {string} jobName - [object Object]
 * @param {string} filesorfoldersname - [object Object]
 * @param {number} jobRunId - [object Object]
 * @param {number} jobId - [object Object]
 * @param {number} sourceId - [object Object]
 * @param {number} startedTimeUsecs - [object Object]
 * @param {number} clusterId - [object Object]
 * @param {number} clusterIncarnationId - [object Object]
 * @param {boolean} recoverToOriginalLocation - [object Object]
 * @param {boolean} overwriteExistingFileOrFolder - [object Object]
 * @param {CS:CohesityConnection} connection
 * @param {string} environment
 * @param {string} recoveryMethod - [object Object]
 * @return {number} restoreJobId - [object Object]
 * @return {string} recoverto - [object Object]
 */
System.log("**********");
System.log("Requesting the recovery of files/folder");
System.log("**********");

var overwrite = overwriteExistingFileOrFolder;
if (!recoverToOriginalLocation) {
    recoverto = recoverTo;
}

System.log("recoverto " + recoverto);

// The Job Uid Params
var jobUid = new CSJobUid();
jobUid.clusterId = clusterId;
jobUid.clusterIncarnationId = clusterIncarnationId;
jobUid.id = Number(jobId);

// Restore object params.
var restoreObj = new CSRestoreObject();
restoreObj.jobId = Number(jobId);
restoreObj.jobRunId = Number(jobRunId);
restoreObj.jobUid = jobUid;
restoreObj.startedTimeUsecs = Number(startedTimeUsecs);
restoreObj.protectionSourceId = Number(sourceId);

// Restore Request Obj
var restoreFileRequest = new CSRestoreFileRequest();
restoreFileRequest.name = jobName;
restoreFileRequest.continueOnError = true;
restoreFileRequest.overwrite = overwrite;
restoreFileRequest.preserveAttributes = preserveAttributes;
restoreFileRequest.filenames = [filesorfoldersname];
restoreFileRequest.newBaseDirectory = recoverto;
restoreFileRequest.targetSourceId = Number(sourceId);
restoreFileRequest.sourceObjectInfo = restoreObj;

// Optional Params (Should be null in case of kPhysical machines)
restoreFileRequest.targetParentSourceId = targetParentSourceId ? Number(targetParentSourceId) : targetParentSourceId;
// Hack (By default in the list of input the first element gets selected.
restoreFileRequest.targetHostType = environment == 'VMware' && osType ? "k" + osType : null;
restoreFileRequest.username = userName ? userName : null;
restoreFileRequest.password = passWord ? passWord : null;
if (environment == 'VMware') {
	restoreFileRequest.fileRecoveryMethod = 
		recoveryMethod == 'VMware Tools'
		? 'kUseHypervisorAPIs' 
		: 'kAutoDeploy';
}

// add the prefix / suffix if they are set
System.log("Restore started for Files or Folders Name: " + filesorfoldersname);
var response = CSProtectionSourceManager.restoreFilesOrFolders(connection, restoreFileRequest)

var restoreJobId = response.id;
System.log("The restoreJobId is " + restoreJobId);