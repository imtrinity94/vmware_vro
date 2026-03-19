/**
 * Unmount volume
 *
 * @param {VC:Datastore} datastore
 * @return {Array/Any} dsuuid
 */

if(!datastore) throw "Selected datastore must not be empty!"

var dsName = datastore.name;

//check for datastore type
if(datastore.summary.type !== "VMFS") {
	var msg = "Selected datastore '"+ dsName +"' is not a VMFS datastore! Selected datastore type: " + datastoreObj.summary.type;
	System.error(msg);
	throw msg;
}
//check if datastore is accesible
if(!datastore.info.vmfs) {
	System.error("Selected VMFS datastore '"+ dsName +"' is not accessible!");
	throw "Selected VMFS datastore '"+ dsName +"' is not accessible!";
}

dsuuid = new Array();

var deviceNaa =  datastore.info.vmfs.extent[0].diskName;

var hostsToRescan = new Array();
var hosts = datastore.host;
for (var i=0; i < hosts.length; i++) {
    var hostEntity = hosts[i].key;
	hostsToRescan.push(hostEntity);
}

for (var i=0; i < hostsToRescan.length; i++) {
    var hostEntity = hostsToRescan[i];
        
    dsuuid.push(datastore.info.vmfs.uuid);
		
    System.log("Running UNMOUNT process on datastore " + dsName + " host named " + hostEntity.name); 
    var unmountTask = hostEntity.configManager.storageSystem.unmountVmfsVolumeEx_Task(dsuuid);
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


