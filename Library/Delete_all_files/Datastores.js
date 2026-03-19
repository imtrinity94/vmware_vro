/**
 * Datastores
 *
 * @return {Properties} datastoresByName
 */
var datastores = VcPlugin.getAllDatastores();
datastoresByName = new Properties();
for each (var ds in datastores) {
	datastoresByName.put("[" + ds.name + "]", ds);
}