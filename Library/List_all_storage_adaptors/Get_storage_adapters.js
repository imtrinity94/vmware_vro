/**
 * Get storage adapters
 *
 * @param {VC:HostSystem} host
 * @return {Array/string} devices
 */
var hostStorageSystem = VcPlugin.toManagedObject( host, host.configManager.storageSystem );

// Display available storage adapters
var hostBusAdapters = hostStorageSystem.storageDeviceInfo.hostBusAdapter;
if ( hostBusAdapters != null  &&  hostBusAdapters.length > 0 )  {
	System.log( "Found " + hostBusAdapters.length + " storage adaptors." );
	devices = [hostBusAdapters.length];
	for(var i=0; i < hostBusAdapters.length; i++ )  {
		devices[i] = hostBusAdapters[i].device;
		System.log( "\tDevice: " + hostBusAdapters[i].device + "\tModel: " + hostBusAdapters[i].model);
	}
}
else  {
	System.log( "No storage adaptors found" );
}