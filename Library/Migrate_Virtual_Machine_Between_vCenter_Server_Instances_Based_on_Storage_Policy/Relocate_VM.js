/**
 * Relocate VM
 *
 * @param {VC:VirtualMachine} vCenterVM
 * @param {Array/string} storageObjects
 * @param {Array/string} storagePoliciesUuids
 * @param {Array/VC:Datastore} allocatedDatastores
 * @param {VC:SdkConnection} destVC
 * @param {string} destVCUsername
 * @param {SecureString} destVCPassword
 * @param {string} destVCSslThumbprint
 * @param {VC:ResourcePool} destResourcePool
 * @param {Array/VC:Network} destNetworks
 * @param {Array/VC:DistributedVirtualPortgroup} destDVPortgroups
 * @param {number} sleepTime
 * @param {VC:HostSystem} destVCHost
 * @return {VC:VirtualMachine} relocatedVM
 * @return {VC:VirtualMachine} migratedVM
 */
var datastore = null;
var vmHomeStoragePolicy = null;
var disksDatastores = new Array();
var disksStoragePolicies = new Array();

for (var i in storageObjects) {
    if (storageObjects[i] == "vmhome") {
        datastore = allocatedDatastores[i];
        vmHomeStoragePolicy = storagePoliciesUuids[i];
    } else {
        var diskIndex = parseInt(storageObjects[i].substr(4));
        disksDatastores[diskIndex] = allocatedDatastores[i];
        disksStoragePolicies[diskIndex] = storagePoliciesUuids[i];
    }
}

var serviceUrl = destVC.toString();
var serviceUuid = destVC.about.instanceUuid;

var vmInstanceUuid = vCenterVM.config.instanceUuid;

System.getModule("com.vmware.library.spbm").relocateVirtualMachine(vCenterVM, datastore, vmHomeStoragePolicy, disksDatastores, disksStoragePolicies, serviceUrl, destVCUsername, destVCPassword, serviceUuid, destVCSslThumbprint, destVCHost, destResourcePool, destNetworks, destDVPortgroups, sleepTime);

var vms = destVCHost.vm;
relocatedVM = null;
migratedVM = null;
for each (var vm in vms) {
    if (vm.config.instanceUuid == vmInstanceUuid) {
        relocatedVM = vm;
        migratedVM = vm;
        break;
    }
}
if (migratedVM == null) {
    throw "Can't find migrated VM";
}
