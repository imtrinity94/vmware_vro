/**
 * Find Compliant Datastores
 *
 * @param {VC:VirtualMachine} vCenterVM
 * @param {Array/string} storageObjects
 * @param {Array/string} storagePoliciesUuids
 * @param {Array/VC:Datastore} destinationDatastores
 * @param {REST:RESTHost} pbmHost
 * @param {string} cookie
 * @param {VC:Datastore} vmHomeDatastore
 * @param {Array/VC:Datastore} disksDatastores
 * @return {Array/string} relocateStorageObjects
 * @return {Array/string} relocateStoragePoliciesUuids
 * @return {Array/VC:Datastore} relocateDatastores
 * @return {Array/string} reconfigStorageObjects
 * @return {Array/string} reconfigStoragePoliciesUuids
 */
relocateStorageObjects = new Array();
relocateStoragePoliciesUuids = new Array();
relocateDatastores = new Array();

reconfigStorageObjects = new Array();
reconfigStoragePoliciesUuids = new Array();

var disks = System.getModule("com.vmware.library.spbm").getVMDisks(vCenterVM);

var datastoresInHost = vCenterVM.runtime.host.datastore;
var qualifiedDatastores = new Array();
for each (var datastore in destinationDatastores) {
    if (datastoresInHost.some(function (item) { return item.id == datastore.id})) {
        qualifiedDatastores.push(datastore);
        System.log("Qualified datastore: " + datastore.name);
    }
}

var candidatureDatastoresForPolicy = {};
var usedSpace = {};

for (var i in storageObjects) {
    var curDatastoreId;
    var capacity = 0;
    if (storageObjects[i] == "vmhome") {
        curDatastoreId = vmHomeDatastore.id;
    } else {
        var diskIndex = parseInt(storageObjects[i].substr(4));
        curDatastoreId = disksDatastores[diskIndex].id;
        capacity = disks[diskIndex].capacityInBytes;
    }

    if (storagePoliciesUuids[i] == "default" || System.getModule("com.vmware.library.spbm").checkDatastoreCompliance(pbmHost, cookie, curDatastoreId, storagePoliciesUuids[i])) {
        reconfigStorageObjects.push(storageObjects[i]);
        reconfigStoragePoliciesUuids.push(storagePoliciesUuids[i]);
    } else {
        relocateStorageObjects.push(storageObjects[i]);
        relocateStoragePoliciesUuids.push(storagePoliciesUuids[i]);
        var targetDatastore = getRelocateDatastore(storagePoliciesUuids[i]);
        if (targetDatastore != null) {
            if (capacity <= targetDatastore.summary.freeSpace - usedSpace[targetDatastore.id]) {
                relocateDatastores.push(targetDatastore);
                usedSpace[targetDatastore.id] += capacity;
            } else {
                throw "Non of the compliant datastores have enough free space for " + storageObjects[i];
            }
        } else {
            throw "Can't find compliant datastore for " + storageObjects[i];
        }
    }
}

function getRelocateDatastore(policy) {
    if (candidatureDatastoresForPolicy[policy] == null) {
        candidatureDatastoresForPolicy[policy] = new Array();
        var compliantDatastoresIds = System.getModule("com.vmware.library.spbm").getAllDatastoresCompliantWithStoragePolicy(pbmHost, cookie, policy);
        for each (var datastore in qualifiedDatastores) {
            if (datastore.summary.accessible && compliantDatastoresIds.indexOf(datastore.id) != -1) {
                candidatureDatastoresForPolicy[policy].push(datastore);
            }
        }
    }
    return getMaxFreeSpaceDatastore(candidatureDatastoresForPolicy[policy]);
}

function getMaxFreeSpaceDatastore(datastores) {
    var maxFreeSpace = -1;
    var maxFreeSpaceDatastore = null;
    for each (var datastore in datastores) {
        datastore.refreshDatastore();
        if (usedSpace[datastore.id] == null) {
            usedSpace[datastore.id] = 0;
        }
        if (maxFreeSpace < datastore.summary.freeSpace - usedSpace[datastore.id]) {
            maxFreeSpace = datastore.summary.freeSpace - usedSpace[datastore.id];
            maxFreeSpaceDatastore = datastore;
        }
    }
    return maxFreeSpaceDatastore;
}
