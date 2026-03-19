/**
 * Send Restore Request
 *
 * @param {string} jobName - [object Object]
 * @param {number} jobRunId - [object Object]
 * @param {number} protectionJobId - [object Object]
 * @param {number} protectionSourceId - [object Object]
 * @param {number} startedTimeUsecs - [object Object]
 * @param {number} clusterId - [object Object]
 * @param {number} clusterIncarnationId - [object Object]
 * @param {boolean} poweredOn - [object Object]
 * @param {CS:CohesityConnection} connection
 * @param {string} vmname
 * @param {string} machinePrefix
 * @param {string} machineSuffix
 * @param {CS:VCenterResource} vCenter - [object Object]
 * @param {CS:ResourcePool} resourcePool - [object Object]
 * @param {CS:Datastore} datastore - [object Object]
 * @param {CS:NetworkEntities} networkEntity - [object Object]
 * @param {boolean} restoreToAlternateLocation - [object Object]
 * @param {number} protectionJobUid_objectId - [object Object]
 * @param {boolean} detachNetwork - [object Object]
 * @return {number} restoreJobId - [object Object]
 */
try {
    System.log("**********");
    System.log("Requesting the recovery");
    System.log("**********");

    var jobUid = new CSJobUid();
	jobUid.id = protectionJobUid_objectId;
    jobUid.clusterId = clusterId;
    jobUid.clusterIncarnationId = clusterIncarnationId;

    var restoreTaskRequest = new CSRestoreTaskRequest();

    restoreTaskRequest.name = jobName;
    // The default is supposed to be off.  It will power on if we don't set it.
    restoreTaskRequest.poweredOn = poweredOn;
    restoreTaskRequest.jobRunId = Number(jobRunId);
    restoreTaskRequest.protectionSourceId = Number(protectionSourceId);
    restoreTaskRequest.startedTimeUsecs = startedTimeUsecs;
    restoreTaskRequest.protectionJobId = Number(protectionJobId);
    restoreTaskRequest.jobUid = jobUid;

    // add the prefix / suffix if they are set
    if (machinePrefix != "") {
        restoreTaskRequest.prefix = machinePrefix
    }
    if (machineSuffix != "") {
        restoreTaskRequest.suffix = machineSuffix
    }
    restoreTaskRequest.type = "kRecoverVMs";

	if (restoreToAlternateLocation) {
		var restoreJobId = CSProtectionSourceManager.restoreVirtualMachineToAlternateLocation(connection, restoreTaskRequest, vCenter,
		 resourcePool, datastore, !detachNetwork ? networkEntity : null);

	} else {
		var response = CSProtectionSourceManager.restoreVirtualMachine(connection, restoreTaskRequest);
		var restoreJobId = response.id;
	}
    
    System.log("The restoreJobId is " + restoreJobId);
    System.log("[SUCCCESS] Virtual machine: " + vmname + "restore request sent successfully.");

} catch (err) {
    throw "Could not submit restore job with error " + err;
};