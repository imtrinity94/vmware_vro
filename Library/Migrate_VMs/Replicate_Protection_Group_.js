/**
 * Replicate Protection Group
 *
 * @param {Array/PS:ProtectionGroup} volumePgList
 */
System.log("Replicating Protection Groups.");
for each(var pg in volumePgList){
	var pGroupSourceList=new Array();
	pGroupSourceList.push(pg);
	var faConnection=PSProtectionGroupManager.getConnectionByProtectionGroup(pg);
	var pgSnapList = System.getModule("com.purestorage.flasharray.protectiongroupsnapshot").createProtectionGroupSnapshotsWithReplication(faConnection,pGroupSourceList,null);
	var restSession = PSSessionManager.getSession(faConnection);
	var replicated = PSProtectionGroupSnapshotManager.getReplicationStatusOfPGSnap(pgSnapList[0], restSession);
	if(!replicated)
	{
		System.error("Protection Group Snapshot is not replicated for Protection Group: " +pg.name);
	}
	//System.sleep(30000); // waiting for replicate to complete for 30 seconds
}