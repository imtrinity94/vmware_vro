/**
 * Attach SCSI lun
 *
 * @param {Array/VC:HostSystem} hostsToRescan
 * @param {string} diskCanonicalName
 */
for (var i=0; i < hostsToRescan.length; i++) {
    var hostEntity = hostsToRescan[i];
	   
    var scsiLun = new Array();
	var sLun = hostEntity.config.storageDevice.scsiLun;
	
	var volumeFound = false;
	for (var j=0; j < sLun.length; j++) {
        if(sLun[j].canonicalName == diskCanonicalName)
        {
			volumeFound = true;
			scsiLun.push(sLun[j].uuid);
			break;
		}
    }
	if(!volumeFound)
	{
		var attachError = "Volume attach error. Volume: " + diskCanonicalName + " not found on the ESXi host: " + hostEntity.name;
		System.error(attachError);
		throw attachError;
	}
	var attachTask = hostEntity.configManager.storageSystem.attachScsiLunEx_Task(scsiLun);
	while(attachTask.info.state.value == "running"){}
	System.log("attach scsi lun completed");
}


