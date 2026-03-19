/**
 * Delete target
 *
 * @param {VC:HostSystem} host
 * @param {string} type
 * @param {string} targetToDelete
 */
var hostStorageSystem = VcPlugin.toManagedObject( host, host.configManager.storageSystem );

// Get available storage adapters
var hostBusAdapters = hostStorageSystem.storageDeviceInfo.hostBusAdapter;
var isSuccessful = false;
for each (var busAdapter in hostBusAdapters){
	if(busAdapter.driver == 'iscsi_vmk'){
		var targetAttributes = targetToDelete.split(" ");
		if(type == 'Send'){
			for each(var target in busAdapter.configuredSendTarget){
 				 if(target.address == targetAttributes[0] && target.port == targetAttributes[1]){
					hostStorageSystem.removeInternetScsiSendTargets(busAdapter.device, [target]);
					System.log("Deleted iSCSI send target " + targetToDelete);
					isSuccessful = true;
				 }
			}
		} else if (type == 'Static'){
			for each(var target in busAdapter.configuredStaticTarget){
				if(target.address == targetAttributes[0] && target.port == targetAttributes[1] && target.iScsiName == targetAttributes[2]){
					hostStorageSystem.removeInternetScsiStaticTargets(busAdapter.device, [target]);
					System.log("Deleted iSCSI static target " + targetToDelete);
					isSuccessful = true;
				 }
			}
		} else {
			throw "Unknown target type '" + type + "'";
		}
	}
}

if(!isSuccessful){
	throw "Can not find target " + targetToDelete;
}