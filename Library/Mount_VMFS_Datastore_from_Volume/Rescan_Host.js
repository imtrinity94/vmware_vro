/**
 * Rescan Host
 *
 * @param {StoreServ:Volume} volResult
 * @param {Array/VC:HostSystem} hosts
 * @return {VC:HostSystem} vmfsHost
 * @return {string} diskName
 */
for (i = 0; i < hosts.length; i++){
	System.log("Rescanning host " + hosts[i].name);
	System.getModule("com.vmware.library.vc.storage").rescanAll(hosts[i]);
	System.log("Rescanning host " + hosts[i].name + " completed");		
}

System.sleep(3000);

vmfsHost = hosts[0];

var lc = volResult.wwn;

lc = lc.toLowerCase();

var scsiDevs = vmfsHost.configManager.storageSystem.storageDeviceInfo.scsiLun;

System.log("The new device NAA is naa." + lc);

var devNaa = ("naa." + lc);
var dp = [];
var displaynamefound = false;
for (devs = 0; devs < scsiDevs.length; devs++){
	if (scsiDevs[devs].canonicalName == devNaa){
         diskName = scsiDevs[devs].displayName;
		 dp.push(scsiDevs[devs].canonicalName);
         System.log("Found matching device " + diskName);
		 displaynamefound = true;
    }
}

if (displaynamefound == false){
	for(var retry = 0; retry < 6; retry++){
		System.log("Could not find matching device, Trying to rescan again");
		System.sleep(1000);
		
		for (i = 0; i < hosts.length; i++){
			System.log("Rescanning host " + hosts[i].name);
			System.getModule("com.vmware.library.vc.storage").rescanAll(hosts[i]);		
			System.log("Rescanning host " + hosts[i].name + " completed");
		}
		
		vmfsHost = hosts[0];
		
		var lc = volResult.wwn;
		
		lc = lc.toLowerCase();
		
		var scsiDevs = vmfsHost.configManager.storageSystem.storageDeviceInfo.scsiLun;
		
		System.log("The new device NAA is naa." + lc);
		
		var devNaa = ("naa." + lc);
		var dp = [];
		for (devs = 0; devs < scsiDevs.length; devs++){
			if (scsiDevs[devs].canonicalName == devNaa){
		         diskName = scsiDevs[devs].displayName;
				 dp.push(scsiDevs[devs].canonicalName);
		         System.log("Found matching device " + diskName);
				 displaynamefound = true;
		    }
		}
		if (displaynamefound == true) {
			break;
		}
	}
}
