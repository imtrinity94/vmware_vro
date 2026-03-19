/**
 * Get datastore create options
 *
 * @param {VC:HostSystem} host
 * @param {string} datastoreName
 * @param {Any} hostScsiDisk
 * @return {Any} vmfsDatastoreOption
 */
if(!host) throw "Esxi host should not be empty. host parameter is null!";
var hostDSSystem = VcPlugin.toManagedObject( host, host.configManager.datastoreSystem );

var vmfsDSOptions;
 

if(host.summary.config.product.apiVersion == "6.5" ) {
	System.debug("The ESXi host apiVersion: 6.5. Creating datastore with VMFS 6.");
	vmfsDSOptions = hostDSSystem.queryVmfsDatastoreCreateOptions( hostScsiDisk.devicePath , 6);
 }
else {
	System.debug("The ESXi host apiVersion: " + host.summary.config.product.apiVersion);
	vmfsDSOptions = hostDSSystem.queryVmfsDatastoreCreateOptions( hostScsiDisk.devicePath);
 }
// Gets the first available VMFS datastore create option
if (vmfsDSOptions.length > 0){
	vmfsDatastoreOption = vmfsDSOptions[0];
	vmfsDatastoreOption.spec.vmfs.volumeName = datastoreName;
} else {
	throw "No layout configuration available for disk " + hostScsiDisk.displayName;
}