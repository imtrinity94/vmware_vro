/**
 * Retrieve datastore
 *
 * @param {Array/Properties} trapData
 * @param {string} datastoreNameOID
 * @return {VC:Datastore} datastore
 */
var datastoreName;
for (var x = 0; x < trapData.length; x++) {
    var prop = trapData[x];
	if (prop.get("oid") == datastoreNameOID) {
		datastoreName = prop.get("value");
		break;
	}
}

System.log("Datastore object found - " + datastoreName);

var datastores = VcPlugin.getAllDatastores();
for (var i = 0; i < trapData.length; i++) {
    var ds = datastores[i];
    if (ds.name == datastoreName) {
        datastore = ds;
        break;
    }
}