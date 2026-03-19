/**
 * Check Compliance
 *
 * @param {VC:VirtualMachine} vCenterVM
 * @param {Array/string} storageObjects
 * @param {Array/string} storagePolicies
 * @param {REST:RESTHost} pbmHost
 * @param {string} cookie
 * @param {number} sleepTime
 * @return {string} status
 */
var vmKey = vCenterVM.id;
System.log(vmKey);
var disks = System.getModule("com.vmware.library.spbm").getVMDisks(vCenterVM);

status = "compliant";
for (var i in storageObjects) {
    if (storagePolicies[i] == "default") {
        continue;
    }

    if (storageObjects[i] == "vmhome") {
        System.log(pbmHost);
        System.log(cookie);
        System.log(storagePolicies[i]);
        System.log(vmKey + ":" + disks[diskIndex].key);
        status = System.getModule("com.vmware.library.spbm").checkStorageObjectCompliance(pbmHost, cookie, "virtualMachine", vmKey, storagePolicies[i]);
    } else {
        var diskIndex = parseInt(storageObjects[i].substr(4));
        status = System.getModule("com.vmware.library.spbm").checkStorageObjectCompliance(pbmHost, cookie, "virtualDiskId", vmKey + ":" + disks[diskIndex].key, storagePolicies[i]);
    }

    if (status != "compliant") {
        break;
    }
}