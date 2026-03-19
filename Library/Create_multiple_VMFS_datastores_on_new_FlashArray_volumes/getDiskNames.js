/**
 * getDiskNames
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {Array/PS:Volume} volumeCreated
 * @return {Array/string} diskNames
 * @return {VC:HostSystem} vmfsHost
 */
var hosts=cluster.host;
var vmfsHost = hosts[0];
var scsiDevs = vmfsHost.configManager.storageSystem.storageDeviceInfo.scsiLun;

diskNames=new Array();

for each(var volume in volumeCreated){
	var toLowerCase = volume.serial;
	toLowerCase = toLowerCase.toLowerCase();
	System.log("The new device NAA is naa.624a9370" + toLowerCase);
	
	var devNaa = ("naa.624a9370" + toLowerCase);
	for (devs = 0; devs < scsiDevs.length; devs++){
		if (scsiDevs[devs].canonicalName == devNaa){
			diskNames.push(scsiDevs[devs].displayName);
			System.log("Found matching device " + scsiDevs[devs].displayName);
			continue;
    	}
	}
}