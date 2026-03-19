/**
 * Create iSCSI adapter if not
 *
 * @param {VC:HostSystem} esxiHost
 * @return {string} iSCSIDeviceName
 */
var iSCSICreated = false;
var iSCSIAdapterStatus;

var hostStorageSystem = VcPlugin.toManagedObject( esxiHost, esxiHost.configManager.storageSystem );
var hostBusAdapters = hostStorageSystem.storageDeviceInfo.hostBusAdapter;

/* Enabling iSCSI software adapter hasbeen done without any conditions because the method 'updateSoftwareInternetScsiEnabled' will
1) Create a new adapter, if it does not exist and enable it.
2) or, enable the adapter if it was created but disabled
3) or, reanble it again, if it was already created and enabled.

So to explicitly make sure that the adapter is enabled in all these three scenarios, 
the code block having conditional execution has been commented and instead the adapter is enabled by default.
*/

/* for each (var busAdapter in hostBusAdapters){
	//if(busAdapter.model == 'iSCSI Software Adapter') {
	if(busAdapter.driver == 'iscsi_vmk') {
		System.log( "Found iSCSI storage adapter having device name: " + busAdapter.device);
		iSCSICreated = true;
		iSCSIAdapterStatus = busAdapter.status;
		break;
	}
}
 if iSCSI adapter not created or if not online, create and enable the same.
if(iSCSICreated == false || iSCSIAdapterStatus != "online") {
	hostStorageSystem.updateSoftwareInternetScsiEnabled(true); // this method also creates the adapter if not already created
	System.log("Creating and\or enabling the software iSCSI adapter on host: " + host.name);
}
*/
hostStorageSystem.updateSoftwareInternetScsiEnabled(true); // this method also creates the adapter if not already created
System.log("By default, creating and\or enabling the software iSCSI adapter on host: " + esxiHost.name);

// get device name of the iSCSI adapter
for each (var busAdapter in hostBusAdapters){
	//if(busAdapter.model == 'iSCSI Software Adapter') {
	if(busAdapter.driver == 'iscsi_vmk') {
		System.log( "iSCSI storage adapter device name: " + busAdapter.device);
		iSCSIDeviceName = busAdapter.device;
		break;
	}
}