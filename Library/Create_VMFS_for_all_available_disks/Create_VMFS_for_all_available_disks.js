/**
 * Create VMFS for all available disks
 *
 * @param {VC:HostSystem} host
 * @param {number} vmfsVersion
 * @return {Array/VC:Datastore} createdDatastores
 * @return {string} errorMessage
 */
if(vmfsVersion !=3 && vmfsVersion !=5){
	throw "Invalid VMFS version " + vmfsVersion;
}

createdDatastores = new Array();

var hostDatastoreSystem = VcPlugin.convertToVimManagedObject( host, host.configManager.datastoreSystem );

// Get available disks
var freeDisks = hostDatastoreSystem.queryAvailableDisksForVmfs();
if ( freeDisks != null  &&  freeDisks.length > 0 )  {
	System.log( "Found " + freeDisks.length + " available disks for VMFS creation:" );
	for each ( var disk in freeDisks )  {
		try {
			var devicePath = disk.devicePath;
			// Compute the size of the disk in GB
			var size = (disk.capacity.block * disk.capacity.blockSize) / 1024 / 1024 / 1024;
	
			// Generate the volume name
			var volumeName = devicePath.substring( devicePath.lastIndexOf("/")+1 ).replace( new RegExp(":", "g"), "_" );
	
			// Log the creation
			System.log( "\tA datastore for disk.devicePath : '" + devicePath + "' will be created (capacity : " + size + " GB, name : '" + volumeName + "')" );
			Server.log( "A datastore will be created", "devicePath : '" + devicePath + "' - capacity : " + size + " GB, name : '" + volumeName + "'" );
	
			// Query the available datastore create options 
			var vmfsDsCreateOptions;
			var isAPIVersion5Compatible = System.getModule("com.vmware.library.vc.storage").isAPICompatible(host, "5");
			if ( isAPIVersion5Compatible ) {
			  	vmfsDsCreateOptions = hostDatastoreSystem.queryVmfsDatastoreCreateOptions( devicePath , vmfsVersion);
			} else {
				vmfsDsCreateOptions = hostDatastoreSystem.queryVmfsDatastoreCreateOptions( devicePath );
			}
	
			// Set the datastore name to the disk name
			vmfsDsCreateOptions[0].spec.vmfs.volumeName = volumeName;
			var createdDs = hostDatastoreSystem.createVmfsDatastore( vmfsDsCreateOptions[0].spec );
			createdDatastores.push( createdDs );
		}
		catch (ex) {
			System.error("Unable to create the datastore. Reason: " + ex);
			Server.error("Unable to create the datastore. Reason: " + ex);
		}
	}
}
else  {
	System.log( "No available disk found" );
}
