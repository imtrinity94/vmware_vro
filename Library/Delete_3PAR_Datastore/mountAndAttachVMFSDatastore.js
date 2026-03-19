/**
 * mountAndAttachVMFSDatastore
 *
 * @param {VC:Datastore} datastore
 * @param {Array/Any} dsUuid
 */
// Get Hosts
var hostsToRescan = new Array();
var diskCanonicalName = datastore.info.vmfs.extent[0].diskName;
var hosts = datastore.host;

//Create host list to rescan
for (var i=0; i < hosts.length; i++) {
    var hostObj = hosts[i].key;
	hostsToRescan.push(hostObj);
}

// Attach process
for (var i=0; i < hostsToRescan.length; i++) {
    var hostObj = hostsToRescan[i];
	   
    var scsiLun = new Array();
	var sLun = hostObj.config.storageDevice.scsiLun;
	
	var foundVolume = false;
	for (var j=0; j < sLun.length; j++) {
        if(sLun[j].canonicalName == diskCanonicalName)
        {
			foundVolume = true;
			scsiLun.push(sLun[j].uuid);
			break;
		}
    }
	if(!foundVolume)
	{
		var volAttachError = "Error while attaching volume. Volume: " + diskCanonicalName + " not found on the ESXi host: " + hostObj.name;
		System.error(volAttachError);
		throw volAttachError;
	}
	var attach = hostObj.configManager.storageSystem.attachScsiLunEx_Task(scsiLun);
	while(attach.info.state.value == "running"){}
	System.log("Attached SCSI LUN successfully.");
}


//Rescan the hosts
for each(var esxiHost in hostsToRescan) {
	System.log("Rescanning ESXi host... " + esxiHost.name);
	System.getModule("com.vmware.library.vc.storage").rescanAll(esxiHost);
}

var datastoreName = datastore.name;

// Mount process
System.log("dsUuid : "+dsUuid);
for (var i=0; i < hostsToRescan.length; i++) {
    var hostObj = hostsToRescan[i];
       	
    System.log("Running mount on datastore " + datastoreName + " host " + hostObj.name); 
    var mountTask = hostObj.configManager.storageSystem.mountVmfsVolumeEx_Task(dsUuid);
    while(mountTask.info.state.value == "running"){}
	System.log("Mounted successfully.");
	
}

var ds = hostsToRescan[0].datastore;
var datastoreOut = null;

for(var i = 0; i < ds.length; i++)
{
	if(ds[i].name == datastore.name)
	{
		datastoreOut = ds[i];
	}
}

System.debug("Restored datastore successfully.");