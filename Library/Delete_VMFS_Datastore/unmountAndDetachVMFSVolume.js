/**
 * unmountAndDetachVMFSVolume
 *
 * @param {VC:Datastore} datastoreObj
 * @return {Array/VC:HostSystem} hostToRescan
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
	System.error("VMFS datastore '"+ dsName +"' is not accessible!");
	throw "VMFS datastore '"+ dsName +"' is not accessible!";
}

hostToRescan = new Array();

var hosts = datastoreObj.host;

var deviceNaa =  datastoreObj.info.vmfs.extent[0].diskName;



var dsUuid = new Array();
dsUuid.push(datastoreObj.info.vmfs.uuid);

for (var i=0; i < hosts.length; i++) {
    var hostEntity = hosts[i].key;
	hostToRescan.push(hostEntity);

		
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


