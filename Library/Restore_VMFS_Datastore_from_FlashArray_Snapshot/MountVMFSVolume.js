/**
 * MountVMFSVolume
 *
 * @param {VC:Datastore} datastoreObj
 * @param {Array/VC:HostSystem} hostsToRescan
 * @param {Array/Any} dsUuid
 * @param {string} datastoreName
 * @return {VC:Datastore} datastoreOut - [object Object]
 */
System.log("dsUuid : "+dsUuid);
for (var i=0; i < hostsToRescan.length; i++) {
    var hostEntity = hostsToRescan[i];
       	
    System.log("Running MOUNT process on datastore " + datastoreName + " host named " + hostEntity.name); 
    var mountTask = hostEntity.configManager.storageSystem.mountVmfsVolumeEx_Task(dsUuid);
    while(mountTask.info.state.value == "running"){}
	System.log("MOUNT process completed");
	
}
datastoreOut = datastoreObj;

