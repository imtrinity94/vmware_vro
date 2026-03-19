/**
 * Create Datastore
 *
 * @param {string} datastoreName
 * @param {VC:HostSystem} host
 * @param {Any} vmfsDatastoreOption
 * @return {VC:Datastore} datastore
 */
var hostDSSystem = VcPlugin.toManagedObject( host, host.configManager.datastoreSystem );

datastore = hostDSSystem.createVmfsDatastore(vmfsDatastoreOption.spec);

System.log("Datastore added " + datastoreName);

if (datastore) {
	System.log("Created datastore successfully");
	isDSCreated = true;
} else {
	throw "Create datastore unsuccessfull"
}