/**
 * Attach and mount
 *
 * @param {VC:Datastore} datastore
 * @param {Array/Any} dsuuid
 * @return {string} diskName
 * @return {VC:HostSystem} host
 * @return {boolean} isResignatureReq
 */
// Get Hosts
var rescan_Hosts = new Array();
var canonicalDiskName = datastore.info.vmfs.extent[0].diskName;
var hosts = datastore.host;
host = hosts[0].key;
for (var i=0; i < hosts.length; i++) {
    var hostKeyEntitiy = hosts[i].key;
	rescan_Hosts.push(hostKeyEntitiy);
}

for (var i=0; i < rescan_Hosts.length; i++) {
    var hostKeyEntitiy = rescan_Hosts[i];
	   
    var scsiLun = new Array();
	var ssLun = hostKeyEntitiy.config.storageDevice.scsiLun;
	
	var volumeFound = false;
	for (var j=0; j < ssLun.length; j++) {
        if(ssLun[j].canonicalName == canonicalDiskName)
        {
			volumeFound = true;
			diskName = ssLun[j].displayName;
			scsiLun.push(ssLun[j].uuid);
			break;
		}
    }
	if(!volumeFound)
	{
		var attachErr = "Attach volume error. Volume: " + canonicalDiskName + " is not found on the ESXi host: " + hostKeyEntitiy.name;
		System.error(attachErr);
		throw attachErr;
	}
	var attachTask = hostKeyEntitiy.configManager.storageSystem.attachScsiLunEx_Task(scsiLun);
	while(attachTask.info.state.value == "running"){}
	System.log("completed scsi lun attach");
}



for each(var esxihost in rescan_Hosts) {
	System.log("ESXi host rescanning" + esxihost.name);
	System.getModule("com.vmware.library.vc.storage").rescanAll(esxihost);
}

var dsName = datastore.name;

System.log("dsUuid : "+dsuuid);
for (var i=0; i < rescan_Hosts.length; i++) {
    var hostKeyEntitiy = rescan_Hosts[i];
       	
    System.log("Mount process running on datastore " + dsName + " host named " + hostKeyEntitiy.name); 
    var mountTask = hostKeyEntitiy.configManager.storageSystem.mountVmfsVolumeEx_Task(dsuuid);
    while(mountTask.info.state.value == "running"){}
	System.log("Completed mount process");
	
}

var ds = rescan_Hosts[0].datastore;
var datastoreOut = null;

for(var i = 0; i < ds.length; i++)
{
	if(ds[i].name == datastore.name)
	{
		datastoreOut = ds[i];
	}
}

System.debug("Datastore is restored");

var hostDatastoreSystem = VcPlugin.toManagedObject( host, host.configManager.datastoreSystem );
var hostScsiDisks = hostDatastoreSystem.queryAvailableDisksForVmfs(null);
var hostScsiDisk;

System.log(diskName);

if(hostScsiDisks) {
	System.log(hostScsiDisks.length);
	for each (var disk in hostScsiDisks){
		System.log(disk.displayName);
		if (diskName == disk.displayName){
			System.log("Found the match");
			hostScsiDisk = disk;
			isResignatureReq = true;			
			break;
		}		
	}
}