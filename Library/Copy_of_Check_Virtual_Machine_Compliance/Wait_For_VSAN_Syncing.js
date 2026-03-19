/**
 * Wait For VSAN Syncing
 *
 * @param {VC:VirtualMachine} vCenterVM
 * @param {Array/string} storagePolicies
 * @param {Array/string} storageObjects
 * @param {number} sleepTime
 */
var datastoreNameToObjectMap = {};
var datastores = vCenterVM.datastore;
for each (var datastore in datastores) {
    datastoreNameToObjectMap[datastore.name] = datastore;
}

var vmDatastores = {};
vmDatastores["vmhome"] = datastoreNameToObjectMap[vCenterVM.config.files.vmPathName.split("]")[0].split("[")[1]];

var disks = System.getModule("com.vmware.library.spbm").getVMDisks(vCenterVM);
for (var i in disks) {
    vmDatastores["disk" + i] = datastoreNameToObjectMap[disks[i].backing.fileName.split("]")[0].split("[")[1]];
}

var uuids = new Array();
for (var i in storageObjects) {
    var uuid = getVsanStorageObjectUuid(storageObjects[i], storagePolicies[i]);
    if (uuid != null && uuid.length != 0) {
        uuids.push(uuid);
    }
}

if (uuids.length != 0){
    var vsanInternalSystem = vCenterVM.summary.runtime.host.parent.configurationEx.vsanHostConfig[0].hostSystem.configManager.vsanInternalSystem;
    var results = vsanInternalSystem.queryVsanObjects(uuids);
    var decodedJson = JSON.parse(results);
    var tryTime = 200;
    while (isSyncing(decodedJson.dom_objects) && tryTime >= 0) {
        System.log("VSAN Syncing...");
    	System.sleep(sleepTime);
    	--tryTime;
    }
}

function getVsanStorageObjectUuid(object, policy) {
    if (policy == null || policy == "default" || vmDatastores[object].summary.type != "vsan")
        return null;
    var uuid = null;
    if (object == "vmhome") {
        uuid = vCenterVM.config.files.vmPathName.split("/")[0].split(" ")[1];
    } else {
        var diskIndex = parseInt(object.substr(4));
        uuid = disks[diskIndex].backing.backingObjectId;
    }
    return uuid;
}

function isSyncing(object) {
    for (var key in object) {
        if (object[key] != null && typeof(object[key]) == "object" && isSyncing(object[key])) {
            return true;
        } else if (object[key] != null && key == "componentState" && (object[key] == 6 || object[key] == 10) && object.hasOwnProperty("bytesToSync") && object["bytesToSync"] > 0) {
            return true;
        }
    }
    return false;
}
