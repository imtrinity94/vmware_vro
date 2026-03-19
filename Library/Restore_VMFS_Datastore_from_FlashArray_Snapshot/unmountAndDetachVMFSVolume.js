/**
 * unmountAndDetachVMFSVolume
 *
 * @param {VC:Datastore} datastoreObj
 * @param {Array/VC:HostSystem} hostsToRescan
 * @return {Array/Any} dsUuid
 */

if(!datastoreObj) throw "Selected datastore must not be empty!"

var dsName = datastoreObj.name;

//check for datastore type
if(datastoreObj.summary.type !== "VMFS") {
	var msg = "Selected datastore '"+ dsName +"' is not a VMFS datastore! Selected datastore type: " + datastoreObj.summary.type;
	System.error(msg);
	throw msg;
}
//check if datastore is accesible
if(!datastoreObj.info.vmfs) {
	System.error("Selected VMFS datastore '"+ dsName +"' is not accessible!");
	throw "Selected VMFS datastore '"+ dsName +"' is not accessible!";
}

dsUuid = new Array();

var deviceNaa =  datastoreObj.info.vmfs.extent[0].diskName;



for (var i=0; i < hostsToRescan.length; i++) {
    var hostEntity = hostsToRescan[i];
        
    dsUuid.push(datastoreObj.info.vmfs.uuid);
		
    System.log("Running UNMOUNT process on datastore " + dsName + " host named " + hostEntity.name); 
    var unmountTask = hostEntity.configManager.storageSystem.unmountVmfsVolumeEx_Task(dsUuid);
    while(unmountTask.info.state.value == "running"){}
	System.log("UNMOUNT process completed");
	
	
	System.log("Running DETACH scsi lun process on host named " + hostEntity.name);

	var scsiLun = new Array();
	var sLun = hostEntity.config.storageDevice.scsiLun;
	
	var volumeFound = false;
	for (var j=0; j < sLun.length; j++) {
        if(sLun[j].canonicalName == deviceNaa)
        {
			volumeFound = true;
			scsiLun.push(sLun[j].uuid);
			break;
		}
    }
	if(!volumeFound)
	{
		var detachError = "Volume Detach error. Volume: " + deviceNaa + " not found on the ESXi host: " + hostEntity.name;
		System.error(detachError);
		throw detachError;
	}
	var detachTask = hostEntity.configManager.storageSystem.detachScsiLunEx_Task(scsiLun);
	while(detachTask.info.state.value == "running"){}
	System.log("Detach scsi lun completed");
}


