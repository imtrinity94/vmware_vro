/**
 * Get all the required attributes
 *
 * @param {PS:Snapshot} snapshotObj - [object Object]
 * @param {boolean} overrideDefaultBehaviour - [object Object]
 * @param {VC:Datastore} datastore - [object Object]
 * @return {string} snapshotName
 * @return {PS:FlashArrayConnection} flashArrayConnection
 * @return {boolean} overrideDefault
 * @return {Array/VC:HostSystem} hostsToRescan
 * @return {string} diskCanonicalName
 * @return {string} datastoreName
 * @return {Any} hostDatastoreSystem
 */
// Get Snapshot Name from snapshotObj 
snapshotName = snapshotObj.name;

// Get FA connection object 
var restSession = snapshotObj.getSession();
var connectionName = restSession.connectionName;
flashArrayConnection = PSFlashArrayConnectionManager.getFlashArrayConnection(connectionName);

// Set overrideDefault attribute from overrideDefaultBehaviour input parameter
overrideDefault = overrideDefaultBehaviour;

// Get Hosts
hostsToRescan = new Array();
var hosts = datastore.host;
for (var i=0; i < hosts.length; i++) {
    var hostEntity = hosts[i].key;
	hostsToRescan.push(hostEntity);
}
if(!datastore) throw "Selected datastore must not be empty";
var dsName = datastore.name;

//check for datastore type
if(datastore.summary.type !== "VMFS") {
	var msg = "Selected datastore '"+ dsName +"' is not a VMFS datastore! Selected datastore type: " + datastore.summary.type;
	System.error(msg);
	throw msg;
}
//check if datastore is accesible
if(!datastore.info.vmfs) {
	System.error("Selected VMFS datastore '"+ dsName +"' is not accessible!");
	throw "Selected VMFS datastore '"+ dsName +"' is not accessible!";
}

// Get datastore name and diskName
datastoreName = datastore.name;
diskCanonicalName = datastore.info.vmfs.extent[0].diskName;
hostDatastoreSystem = VcPlugin.toManagedObject( hostsToRescan[0], hostsToRescan[0].configManager.datastoreSystem );
