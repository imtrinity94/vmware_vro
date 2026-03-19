/**
 * Find datastore create options
 *
 * @param {VC:HostSystem} host
 * @param {number} vmfsVersion
 * @param {string} datastoreName
 * @param {Any} hostScsiDisk
 * @return {Any} vmfsDatastoreOption
 */
if(vmfsVersion !=3 && vmfsVersion !=5){
	throw "Invalid VMFS version " + vmfsVersion;
}
var hostDatastoreSystem = VcPlugin.toManagedObject( host, host.configManager.datastoreSystem );

var vmfsDatastoreOptions;
var isAPIVersion5Compatible = System.getModule("com.vmware.library.vc.storage").isAPICompatible(host, "5");
if ( isAPIVersion5Compatible ) {
  	vmfsDatastoreOptions = hostDatastoreSystem.queryVmfsDatastoreCreateOptions( hostScsiDisk.devicePath , vmfsVersion);
} else {
	vmfsDatastoreOptions = hostDatastoreSystem.queryVmfsDatastoreCreateOptions( hostScsiDisk.devicePath );
}

// Gets the first available VMFS datastore create option
if (vmfsDatastoreOptions.length > 0){
	vmfsDatastoreOption = vmfsDatastoreOptions[0];
	vmfsDatastoreOption.spec.vmfs.volumeName = datastoreName;
} else {
	throw "There is no layout configuration available for disk " + hostScsiDisk.displayName;
}