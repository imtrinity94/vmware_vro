/**
 * Get/Dispay info
 *
 * @param {VC:HostSystem} host
 */
var hostDatastoreSystem = VcPlugin.convertToVimManagedObject( host, host.configManager.datastoreSystem );

// Display existing datastores
var datastores = host.datastore;
if ( datastores != null  &&  datastores.length > 0 )  {
	System.log( "Found " + datastores.length + " datastores:" );
	for each ( var datastore in datastores )  {
		System.log( "\tDatastore : '" + datastore.name + "'" );
	}
}
else  {
	System.log( "No datastore found" );
}

// Display available disks
var freeDisks = hostDatastoreSystem.queryAvailableDisksForVmfs();
if ( freeDisks != null  &&  freeDisks.length > 0 )  {
	System.log( "Found " + freeDisks.length + " available disks for VMFS creation:" );
	for each ( var disk in freeDisks )  {
		// Compute the size of the disk in GB
		var size = (disk.capacity.block * disk.capacity.blockSize) / 1024 / 1024 / 1024;
		System.log( "\tDisk.devicePath : '" + disk.devicePath + "' - Capacity : " + size + " GB" );
	}
}
else  {
	System.log( "No available disk found" );
}
