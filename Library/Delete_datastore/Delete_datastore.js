/**
 * Delete datastore
 *
 * @param {VC:HostSystem} host
 * @param {string} datastoreName
 */
var hostDatastoreSystem = VcPlugin.toManagedObject( host, host.configManager.datastoreSystem );

var isSuccessful = false;
for each (var datastore in hostDatastoreSystem.datastore) {
	if(datastore.name == datastoreName){
		hostDatastoreSystem.removeDatastore(datastore);
		System.log("Deleted datastore " + datastoreName);
		isSuccessful = true;
		break;
	}
}

if (!isSuccessful) {
	throw "Can not find datastore " + datastoreName;
}