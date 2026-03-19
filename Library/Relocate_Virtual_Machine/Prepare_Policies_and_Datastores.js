/**
 * Prepare Policies and Datastores
 *
 * @param {VC:VirtualMachine} vCenterVM
 * @param {Array/string} storageObjects
 * @param {Array/string} storagePoliciesUuids
 * @param {Array/VC:Datastore} datastores
 * @param {VC:Datastore} vmHomeDatastore
 * @param {Array/VC:Datastore} disksDatastores
 * @return {VC:Datastore} vmHomeDatastore
 * @return {Array/VC:Datastore} disksDatastores
 * @return {string} vmHomeStoragePolicy
 * @return {Array/string} disksStoragePolicies
 */
vmHomeStoragePolicy = null;
disksStoragePolicies = new Array();

for (var i in storageObjects) {
    if (storageObjects[i] == "vmhome") {
        vmHomeStoragePolicy = storagePoliciesUuids[i];
        vmHomeDatastore = datastores[i];
    } else {
        var diskIndex = parseInt(storageObjects[i].substr(4));
        disksStoragePolicies[diskIndex] = storagePoliciesUuids[i];
        disksDatastores[diskIndex] = datastores[i];
    }
}
