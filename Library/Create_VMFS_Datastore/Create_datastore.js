/**
 * Create datastore
 *
 * @param {VC:HostSystem} host
 * @param {Any} vmfsDatastoreOption
 * @param {string} datastoreName
 * @return {VC:Datastore} datastore
 */
var hostDatastoreSystem = VcPlugin.toManagedObject( host, host.configManager.datastoreSystem );

datastore = hostDatastoreSystem.createVmfsDatastore(vmfsDatastoreOption.spec);

System.log("Added datastore " + datastoreName);