/**
 * MountAndAttachVMFSDS
 *
 * @param {Array/VC:HostSystem} hosts
 * @param {StoreServ:Snapshot} snapshot
 */
var lc = snapshot.wwn;
lc = lc.toLowerCase();
var devNaa = ("naa." + lc);

// Get Hosts
var hostsToRescan = new Array();
var diskCanonicalName = devNaa;

//Create host list to rescan
for (var i=0; i < hosts.length; i++) {
    var hostObj = hosts[i].key;	
	hostsToRescan.push(hosts[i]);
}

// Attach process
for (var i=0; i < hostsToRescan.length; i++) {
    var hostObj = hostsToRescan[i];
	   
    var scsiLun = new Array();	
	var sLun = hostObj.configManager.storageSystem.storageDeviceInfo.scsiLun;
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
		var attach = "Error while detaching volume. Volume: " + diskCanonicalName + " not found on the ESXi host: " + hostObj.name;
		System.error(attach);
		throw attach;
	}
	var attach = hostObj.configManager.storageSystem.attachScsiLunEx_Task(scsiLun);
	while(attach.info.state.value == "running"){}
	System.log("Attached SCSI LUN successfully");
}


//Rescan the hosts
for each(var esxihost in hostsToRescan) {
	System.log("Rescanning ESXi host " + esxihost.name);
	System.getModule("com.vmware.library.vc.storage").rescanAll(esxihost);
}


var allDS =  VcPlugin.getAllDatastores();
var datastore;
for each (var dstore in allDS){	
	if(dstore.info.vmfs.extent[0].diskName == devNaa) {
		datastore = dstore;
	}
}

if((datastore == undefined) || (datastore == null)) {
	throw "Datastore not found for device NAA: "+ devNaa;
}

var datastoreName = datastore.name;

// Mount process
var dsUuid = new Array();
dsUuid.push(datastore.info.vmfs.uuid);

System.log("dsUuid : "+dsUuid);
for (var i=0; i < hostsToRescan.length; i++) {
    var hostObj = hostsToRescan[i];
       	
    System.log("Running mount on datastore " + datastoreName + " host " + hostObj.name); 
    var mount = hostObj.configManager.storageSystem.mountVmfsVolumeEx_Task(dsUuid);
    while(mount.info.state.value == "running"){}
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
