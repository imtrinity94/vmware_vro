/**
 * Connect New Volumes to HostGroup and Rescan Cluster
 *
 * @param {PS:FlashArrayConnection} targetFAConnection
 * @param {PS:HostGroup} targetHostGroup
 * @param {Array/PS:Volume} targetVolumeList
 * @param {VC:ClusterComputeResource} targetCluster
 * @return {VC:HostSystem} vmfsHost
 * @return {Array/string} diskNames
 * @return {Array/string} newVolumeNames
 */
// Connect volumes to HostGroup
System.log("Connecting newly created  volumes to Host Group : " + targetHostGroup.name);
for(var i = 0; i < targetVolumeList.length ; i++){
	var result = System.getModule("com.purestorage.flasharray.hostgroup").connectVolumeToHostGroup(targetVolumeList[i],targetHostGroup,targetFAConnection) ; 
}

// Rescan Cluster and get Disk Names of newly created volumes for resignature.
System.log("Rescanning the target cluster.");
var hosts = targetCluster.host;
for (i = 0; i < hosts.length; i++){
	System.getModule("com.vmware.library.vc.storage").rescanAll(hosts[i]);
}
System.sleep(30000);
vmfsHost = hosts[0];
var scsiDevs = vmfsHost.configManager.storageSystem.storageDeviceInfo.scsiLun;
var diskNames = new Array();
var newVolumeNames = new Array();
for(index = 0; index < targetVolumeList.length; index++){

	var toLowerCase = targetVolumeList[index].serial;
	newVolumeNames[index] = targetVolumeList[index].displayName;
	toLowerCase = toLowerCase.toLowerCase();

	System.log("The new device NAA is naa.624a9370" + toLowerCase);

	var devNaa = ("naa.624a9370" + toLowerCase);
	for (devs = 0; devs < scsiDevs.length; devs++){
		System.debug("scsiDevs[devs].canonicalName : " + scsiDevs[devs].canonicalName);
		if (scsiDevs[devs].canonicalName == devNaa){
        	 diskNames[index] = scsiDevs[devs].displayName;
         	System.log("Found matching device " + diskNames[index]);
    	}
	}
}
