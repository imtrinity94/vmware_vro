/**
 * Get all datastores on all VCenter
 *
 * @return {Array/VC:Datastore} datastores
 */
var result = new Properties();
var vcs = VcPlugin.allSdkConnections;
for each (var vc in vcs) {
	var hostSystems = vc.getAllHostSystems()
	for each (var host in hostSystems) {
		dsList = host.datastore;
		for each (var datastore in dsList){
			result.put(datastore.info.name, datastore);
		}
	}
}
var keys = result.keys;
var datastores = new Array();
for each (var key in keys) {
	System.log("Found datastore named: '" + key + "'");
	datastores.push(result.get(key));
}