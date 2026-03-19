/**
 * Clone VM
 *
 * @param {string} selectedView - [object Object]
 * @param {string} machinePrefix - [object Object]
 * @param {string} machineSuffix - [object Object]
 * @param {string} vmName - [object Object]
 * @param {number} vCenterId - [object Object]
 * @param {number} dataCenterId - [object Object]
 * @param {number} networkId - [object Object]
 * @param {number} protectionJobId - [object Object]
 * @param {number} jobRunId - [object Object]
 * @param {number} clusterId - [object Object]
 * @param {number} clusterIncarnationId - [object Object]
 * @param {number} startedTimeUsecs - [object Object]
 * @param {number} resourcePoolId - [object Object]
 * @param {number} protectionSourceId
 * @param {CS:CohesityConnection} connection - [object Object]
 */
try {
	System.log("**********");
	System.log("Requesting clone operation");
	System.log("**********");
	
	var jobUid = new CSJobUid();
	jobUid.clusterId = clusterId;
	jobUid.clusterIncarnationId = clusterIncarnationId;
	
	var cloneTaskRequest = new CSCloneTaskRequest();
	cloneTaskRequest.vmName = vmName;
	cloneTaskRequest.protectionJobId = Number(protectionJobId);
	cloneTaskRequest.networkId = Number(networkId);
	cloneTaskRequest.newParentId = Number(vCenterId);
	cloneTaskRequest.jobRunId = Number(jobRunId);
	cloneTaskRequest.jobUid = jobUid;
	cloneTaskRequest.protectionSourceId = protectionSourceId;
	cloneTaskRequest.startedTimeUsecs = startedTimeUsecs;
	cloneTaskRequest.prefix = "clone_";
	if (machinePrefix != "") {
		cloneTaskRequest.prefix = machinePrefix
	};
	cloneTaskRequest.suffix = machineSuffix;
	cloneTaskRequest.resourcePoolId = Number(resourcePoolId);
	cloneTaskRequest.targetViewName = selectedView;
	cloneTaskRequest.type = "kCloneVMs";
	
	
	var response = CSProtectionSourceManager.cloneVirtualMachine(connection, cloneTaskRequest);
	System.log(vmName + " clone request was successful.");
} catch(err) {
	throw "Could not clone vm " + err;
};