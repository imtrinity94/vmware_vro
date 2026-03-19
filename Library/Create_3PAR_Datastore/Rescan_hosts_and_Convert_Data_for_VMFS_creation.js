/**
 * Rescan hosts and Convert Data for VMFS creation
 *
 * @param {StoreServ:Volume} volResult
 * @param {Array/VC:HostSystem} hosts
 * @return {VC:HostSystem} vmfsHost
 * @return {string} diskName
 */
var displayNamefound = false;
for (i = 0; i < hosts.length; i++){
	System.getModule("com.vmware.library.vc.storage").rescanAll(hosts[i]);
}

System.sleep(3000);

vmfsHost = hosts[0];
var ldev = volResult.wwn;

ldev = ldev.toLowerCase();

var scsiDevices = vmfsHost.configManager.storageSystem.storageDeviceInfo.scsiLun;

System.log("The device is naa." + ldev);

var devName = ("naa." + ldev);
if (scsiDevices != undefined || scsiDevices != null) {
	for (devs = 0; devs < scsiDevices.length; devs++){
		if (scsiDevices[devs].canonicalName == devName){
		  	diskName = scsiDevices[devs].displayName;
	      	System.log("Matching device found " + diskName);
		  	displayNamefound = true;
	    }
	}
}

if (displayNamefound == false) {
	for (var retry = 0; retry < 6; retry++){
		System.log("Could not find matching device, Trying to rescan again");
		System.sleep(1000);
		
		for (i = 0; i < hosts.length; i++){
			System.getModule("com.vmware.library.vc.storage").rescanAll(hosts[i]);
		}
			
		vmfsHost = hosts[0];
		ldev = volResult.wwn;
			
		ldev = ldev.toLowerCase();
			
		scsiDevices = vmfsHost.configManager.storageSystem.storageDeviceInfo.scsiLun;
			
		System.log("The device is naa." + ldev);
			
		devName = ("naa." + ldev);
			
		if (scsiDevices != undefined || scsiDevices != null) {
			for (devs = 0; devs < scsiDevices.length; devs++){
				if (scsiDevices[devs].canonicalName == devName){
		  			diskName = scsiDevices[devs].displayName;
	      			System.log("Matching device found " + diskName);
					displayNamefound = true;
	    		}
			}
		}
		if (displayNamefound == true){
			break;
		}
	}
}
