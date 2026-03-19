/**
 * Allocate Datastores
 *
 * @param {VC:VirtualMachine} vCenterVM
 * @param {VC:HostSystem} destHost
 * @param {Array/string} storageObjects
 * @param {Array/string} storagePoliciesUuids
 * @param {Array/VC:Datastore} destinationDatastores
 * @param {REST:RESTHost} pbmHost
 * @param {string} cookie
 * @return {Array/VC:Datastore} allocatedDatastores
 * @return {boolean} allAllocated
 * @return {string} message
 */
allocatedDatastores = new Array();
allAllocated = true;
message = "";

var disks = System.getModule("com.vmware.library.spbm").getVMDisks(vCenterVM);

var datastoresInHost = destHost.datastore;
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
    var capacity = 0;
    if (storageObjects[i] != "vmhome") {
        capacity = disks[parseInt(storageObjects[i].substr(4))].capacityInBytes;
    }
    if (storagePoliciesUuids[i] == null || storagePoliciesUuids[i] == "default") {
        allocatedDatastores[i] = null;
    } else {
        allocatedDatastores[i] = getRelocateDatastore(storagePoliciesUuids[i]);
        if (allocatedDatastores[i] == null) {
            allAllocated = false;
            message += "Can't find compliant datastore for " + storageObjects[i] + "\n";
        } else {
            if (allocatedDatastores[i].summary.freeSpace - usedSpace[allocatedDatastores[i].id] < capacity) {
                allAllocated = false;
                message += "Non of the compliant datastores have enough free space for " + storageObjects[i] + "\n";
            } else {
                usedSpace[allocatedDatastores[i].id] += capacity;
            }
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
