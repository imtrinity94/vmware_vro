/**
 * unmountAndDetachVMFSDatastore
 *
 * @param {VC:Datastore} datastore
 * @return {Array/VC:HostSystem} hostToRescan
 * @return {Array/Any} dsUuid
 */

if(!datastore) throw "Datastore must not be empty"

var datastoreName = datastore.name;

//check for datastore type. Support only VMFS type
if(datastore.summary.type !== "VMFS") {
	var mesg = "Datastore "+ datastoreName +" is not a VMFS datastore. Datastore type: " + datastore.summary.type;
	System.error(mesg);
	throw mesg;
}
//check if datastore is accesible
if(!datastore.info.vmfs) {
	System.error("VMFS datastore "+ datastoreName +" is not accessible");
	throw "VMFS datastore '"+ datastoreName +"' is not accessible";
}

hostToRescan = new Array();

var hosts = datastore.host;

var deviceNaa =  datastore.info.vmfs.extent[0].diskName;



dsUuid = new Array();
dsUuid.push(datastore.info.vmfs.uuid);

// Unmount and Detach
for (var i=0; i < hosts.length; i++) {
    var hostObj = hosts[i].key;
	hostToRescan.push(hostObj);

		
    System.log("Running unmount on datastore " + datastoreName + " host " + hostObj.name); 
    var unmount = hostObj.configManager.storageSystem.unmountVmfsVolumeEx_Task(dsUuid);
    while(unmount.info.state.value == "running"){}
	System.log("Unmounted successfully.");
	
	
	System.log("Running detach SCSI LUN on host " + hostObj.name);

	var scsiLun = new Array();
	var sLun = hostObj.config.storageDevice.scsiLun;
	
	var foundVolume = false;
	for (var j=0; j < sLun.length; j++) {
        if(sLun[j].canonicalName == deviceNaa)
        {
			foundVolume = true;
			scsiLun.push(sLun[j].uuid);
			break;
		}
    }
	if(!foundVolume)
	{
		var volDetachError = "Error while detaching volume. Volume: " + deviceNaa + " not found on the ESXi host: " + hostObj.name;
		System.error(volDetachError);
		throw volDetachError;
	}
	var detach = hostObj.configManager.storageSystem.detachScsiLunEx_Task(scsiLun);
	while(detach.info.state.value == "running"){}
	System.log("Detached SCSI LUN successfully.");
}


