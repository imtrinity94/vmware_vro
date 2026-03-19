/**
 * Send Restore Disk Request
 *
 * @param {string} jobName - [object Object]
 * @param {CS:ProtectionJobNameResource} protectionJob - [object Object]
 * @param {CS:ObjectResource} backupCandidate - [object Object]
 * @param {CS:SnapshotVersion} snapshots - [object Object]
 * @param {CS:CohesityConnection} connection - [object Object]
 * @param {boolean} powerOffVmBeforeRecovery - [object Object]
 * @param {boolean} powerOnVmAfterRecovery
 * @param {Array/CS:VirtualDiskInformation} virtualDisks - [object Object]
 * @return {number} restoreJobId - [object Object]
 */
var recoverDiskParam= new CSRecoverVirtualDiskParams();
recoverDiskParam.powerOffVmBeforeRecovery = powerOffVmBeforeRecovery === false ? false : true;
recoverDiskParam.powerOnVmAfterRecovery = powerOnVmAfterRecovery === false ? false : true;
recoverDiskParam.targetEntity = new CSTargetEntity();
recoverDiskParam.targetEntity.type = 1;
recoverDiskParam.targetEntity.id = backupCandidate.id;
recoverDiskParam.targetEntity.parentId = backupCandidate.parentId;
recoverDiskParam.targetEntity.displayName = backupCandidate.name;

var mappings = [];
for(var i = 0; i < virtualDisks.length; i++ ) {
	var vdMapping = new CSVirtualDiskMapping();
	
	vdMapping.srcDisk = new CSSrcDisk();
	vdMapping.srcDisk.diskId = virtualDisks[i].diskId;
	vdMapping.srcDisk.unitNumber = virtualDisks[i].unitNumber;
	vdMapping.srcDisk.controllerType = virtualDisks[i].controllerType;
	vdMapping.srcDisk.controllerBusNumber = virtualDisks[i].busNumber;
	
	vdMapping.targetLocation = new CSTargetLocation();
	vdMapping.targetLocation.id = virtualDisks[i].diskLocation.id;
	
	vdMapping.diskToOverwrite = new CSDiskToOverwrite();
	vdMapping.diskToOverwrite.diskId = virtualDisks[i].diskId;
	vdMapping.diskToOverwrite.unitNumber = virtualDisks[i].unitNumber;
	vdMapping.diskToOverwrite.controllerType = virtualDisks[i].controllerType;
	vdMapping.diskToOverwrite.controllerBusNumber = virtualDisks[i].busNumber;
	
	mappings.push(vdMapping);
}
recoverDiskParam.virtualDiskMappings = mappings;


// Recovery objects.
var recoveryObjects = [];
var recoveryObject = new CSRecoveryObject();
recoveryObject.jobId = protectionJob.id;
recoveryObject.jobUid = new CSRestoreRequestJobUid();
recoveryObject.jobUid.objectId = protectionJob.jobUid.id;
recoveryObject.jobUid.clusterId = protectionJob.jobUid.clusterId;
recoveryObject.jobUid.clusterIncarnationId = protectionJob.jobUid.clusterIncarnationId;

recoveryObject.jobInstanceId = snapshots.jobRunId;
recoveryObject.startTimeUsecs = snapshots.startedTimeUsecs;
recoveryObject.entity = new CSEntity();
recoveryObject.entity.id = backupCandidate.id;
recoveryObject.entity.parentId = backupCandidate.parentId;
recoveryObject.entity.type = 1;
recoveryObject.entity.displayName = backupCandidate.name;

recoveryObjects.push(recoveryObject);

// recover disk req
var recoverDiskRequest = new CSRecoverDiskRequest();
recoverDiskRequest.name = jobName;
recoverDiskRequest.objects = recoveryObjects;
recoverDiskRequest.recoverVirtualDiskParams = recoverDiskParam;
recoverDiskRequest.continueRestoreOnError = true;


var restoreJobId = CSProtectionSourceManager.recoverVirtualDisk(
	connection,
	recoverDiskRequest
);