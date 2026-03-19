/**
 * Get Datastores and HD sizes
 *
 * @param {VC:VirtualMachine} vm
 * @return {Array/string} datastoresName
 * @return {Array/number} diskSizes
 * @return {Array/string} datastoresId
 * @return {Array/VC:Datastore} datastores
 */
var datastoresProp = new Properties();
var diskSizes = new Array();

var devices = vm.config.hardware.device;
var j = 0;
for (var i in devices) {
	if (devices[i] instanceof VcVirtualDisk) {
		diskSizes[j++] = devices[i].capacityInKB / 1024;
		var datastore = VcPlugin.convertToVimManagedObject(vm , devices[i].backing.datastore)
		datastoresProp.put(datastore.id, datastore);
	}
}

var datastoresId = new Array();
var datastoresName = new Array();
var datastores = new Array();
for (var i in datastoresProp.keys) {
	datastore = datastoresProp.get(datastoresProp.keys[i]);
	datastoresId[i] = datastore.sdkId;
	datastoresName[i] = datastore.name;
	datastores[i] = datastore;
}

