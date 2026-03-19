/**
 * Find datastore create options
 *
 * @param {VC:HostSystem} host
 * @param {string} datastoreName
 * @param {Any} hostScsiDisk
 * @return {Any} vmfsDatastoreOption
 */
if(!host) throw "Esxi host must not be empty. host parameter is null!";
var hostDatastoreSystem = VcPlugin.toManagedObject( host, host.configManager.datastoreSystem );

var vmfsDatastoreOptions;
 

if(host.summary.config.product.apiVersion == "6.5" ) {
	System.debug("ESXi host apiVersion: 6.5. Creating datastore with VMFS 6.");
	vmfsDatastoreOptions = hostDatastoreSystem.queryVmfsDatastoreCreateOptions( hostScsiDisk.devicePath , 6);
 }
else {
	System.debug("ESXi host apiVersion: " + host.summary.config.product.apiVersion);
	vmfsDatastoreOptions = hostDatastoreSystem.queryVmfsDatastoreCreateOptions( hostScsiDisk.devicePath);
 }
// Gets the first available VMFS datastore create option
if (vmfsDatastoreOptions.length > 0){
	vmfsDatastoreOption = vmfsDatastoreOptions[0];
	vmfsDatastoreOption.spec.vmfs.volumeName = datastoreName;
} else {
	throw "There is no layout configuration available for disk " + hostScsiDisk.displayName;
}