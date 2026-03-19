/**
 * Add iSCSI target
 *
 * @param {VC:HostSystem} host
 * @param {string} targetType
 * @param {string} serverAddress
 * @param {number} port
 * @param {string} targetName
 * @param {string} device
 */
var hostStorageSystem = VcPlugin.toManagedObject( host, host.configManager.storageSystem );
var targets = [];
//The port should be an integer number between 0 and 65535
port = Math.floor(port);
if (port < 0 || port > 65535) {
	throw "The port should be an integer number between 0 and 65535";
}

if (targetType == 'Static'){
	targets[0] = new  new VcHostInternetScsiHbaStaticTarget();
	targets[0].address = serverAddress;
	targets[0].port = port;
	targets[0].iScsiName = targetName;
	hostStorageSystem.addInternetScsiStaticTargets(device, targets);  
} else if (targetType == 'Send'){
	targets[0] = new  new VcHostInternetScsiHbaSendTarget();
	targets[0].address = serverAddress;
	targets[0].port = port;
	hostStorageSystem.addInternetScsiSendTargets(device , targets);
} else {
	throw "Unsupported target type '" + targetType+"'";
}

System.log("Added "+ targetType + " target with server location " + serverAddress + ":" + port);