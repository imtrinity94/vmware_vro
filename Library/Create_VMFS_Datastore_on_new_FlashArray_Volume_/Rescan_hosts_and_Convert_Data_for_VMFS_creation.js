/**
 * Rescan hosts and Convert Data for VMFS creation
 *
 * @param {Array/VC:HostSystem} hosts
 * @param {PS:Volume} volResult
 * @return {VC:HostSystem} vmfsHost
 * @return {string} diskName
 */

for (i = 0; i < hosts.length; i++){
	System.getModule("com.vmware.library.vc.storage").rescanAll(hosts[i]);
}

vmfsHost = hosts[0];
var toLowerCase = volResult.serial;
toLowerCase = toLowerCase.toLowerCase();

var scsiDevs = vmfsHost.configManager.storageSystem.storageDeviceInfo.scsiLun;

System.log("The new device NAA is naa.624a9370" + toLowerCase);

var devNaa = ("naa.624a9370" + toLowerCase);
for (devs = 0; devs < scsiDevs.length; devs++){
	if (scsiDevs[devs].canonicalName == devNaa){
         diskName = scsiDevs[devs].displayName;
         System.log("Found matching device " + diskName);
    }
}