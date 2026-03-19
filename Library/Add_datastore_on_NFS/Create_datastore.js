/**
 * Create datastore
 *
 * @param {VC:HostSystem} host
 * @param {string} server
 * @param {string} folder
 * @param {boolean} readOnly
 * @param {string} datastoreName
 * @return {VC:Datastore} datastore
 */
var hostDatastoreSystem = VcPlugin.toManagedObject( host, host.configManager.datastoreSystem );

var spec = new VcHostNasVolumeSpec() ;
spec.remoteHost = server;
spec.remotePath = folder;
spec.localPath = datastoreName;
spec.type = "nfs";

if (readOnly) {
	spec.accessMode = "readOnly";
} else {
	spec.accessMode = "readWrite";
}

datastore = hostDatastoreSystem.createNasDatastore(spec);
System.log("Added datastore "+ datastoreName + " for NFS share " + server + ":" + folder);