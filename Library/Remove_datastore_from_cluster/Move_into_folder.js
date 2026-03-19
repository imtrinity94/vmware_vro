/**
 * Move into folder
 *
 * @param {Array/VC:Datastore} datastores
 * @param {VC:DatastoreFolder} destination
 * @param {VC:StoragePod} storagePod
 * @return {VC:Task} task
 * @return {VC:StoragePod} outStoragePod
 */
var podDsArray = storagePod.childEntity;

for (var i in datastores) {
	var found = false;
	for (var j in podDsArray) {
		if (podDsArray[j] == datastores[i]) {
			found = true;
			break;
		}
	}
	if (!found) {
		throw datastores[i] + ' not part of the selected cluster';
	}
}

outStoragePod = storagePod;
task = destination.moveIntoFolder_Task(datastores);