/**
 * Rescan Cluster
 *
 * @param {Array/PS:Volume} newVolumeList
 * @param {VC:ClusterComputeResource} clusterName - [object Object]
 * @return {Array/string} diskNames
 * @return {Array/PS:Volume} flashArrayVolumes
 * @return {Array/string} newVolumeNames
 * @return {VC:HostSystem} vmfshost
 */
var hosts = clusterName.host;
for (i = 0; i < hosts.length; i++){
	System.getModule("com.vmware.library.vc.storage").rescanAll(hosts[i]);
}

vmfshost = hosts[0];
var scsiDevs = vmfshost.configManager.storageSystem.storageDeviceInfo.scsiLun;
var diskNames = new Array();
var newVolumeNames = new Array();

for(index = 0; index < newVolumeList.length; index++){

	var toLowerCase = newVolumeList[index].serial;
	newVolumeNames[index] = newVolumeList[index].displayName;
	toLowerCase = toLowerCase.toLowerCase();

	System.log("The new device NAA is naa.624a9370" + toLowerCase);

	var devNaa = ("naa.624a9370" + toLowerCase);
	for (devs = 0; devs < scsiDevs.length; devs++){
		System.log("scsiDevs[devs].canonicalName : " + scsiDevs[devs].canonicalName);
		if (scsiDevs[devs].canonicalName == devNaa){
        	 diskNames[index] = scsiDevs[devs].displayName;
         	System.log("Found matching device " + diskNames[index]);
    	}
	}
}
flashArrayVolumes = newVolumeList;