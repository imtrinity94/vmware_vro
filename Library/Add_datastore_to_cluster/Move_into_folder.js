/**
 * Move into folder
 *
 * @param {VC:StoragePod} storagePod
 * @param {Array/VC:Datastore} datastores
 * @return {VC:Task} task
 * @return {VC:StoragePod} outStoragePod
 */
outStoragePod = storagePod;
task = storagePod.moveIntoFolder_Task(datastores);