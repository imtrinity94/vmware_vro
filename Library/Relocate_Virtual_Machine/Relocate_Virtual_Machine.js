/**
 * Relocate Virtual Machine
 *
 * @param {VC:VirtualMachine} vCenterVM
 * @param {VC:Datastore} vmHomeDatastore
 * @param {Array/VC:Datastore} disksDatastores
 * @param {string} vmHomeStoragePolicy
 * @param {Array/string} disksStoragePolicies
 * @param {number} sleepTime
 */
var vmRelocateSpec = new VcVirtualMachineRelocateSpec();

var disks = System.getModule("com.vmware.library.spbm").getVMDisks(vCenterVM);

if (vmHomeDatastore != null) {
    vmRelocateSpec.datastore = vmHomeDatastore;
    if (vmHomeStoragePolicy != null) {
        vmRelocateSpec.profile = getProfileSpecs(vmHomeStoragePolicy);
    }
}

var diskLocators = new Array();
for (var i in disks) {
    if (disksDatastores[i] != null) {
        var diskLocator = new VcVirtualMachineRelocateSpecDiskLocator();
        diskLocator.diskId = disks[i].key;
        diskLocator.datastore = disksDatastores[i];
        if (disksStoragePolicies[i] != null) {
            diskLocator.profile = getProfileSpecs(disksStoragePolicies[i]);
        }
        diskLocators.push(diskLocator);
    }
}
if (diskLocators.length > 0) {
    vmRelocateSpec.disk = diskLocators;
}

System.log("Virtual machine relocate begin");
var relocateTask = vCenterVM.relocateVM_Task(vmRelocateSpec);
while (relocateTask.info.state.value == "queued" || relocateTask.info.state.value == "running") {
    System.sleep(sleepTime);
}
if (relocateTask.info.state.value == "error") {
    System.log("Virtual machine relocate error: " + relocateTask.info.error.localizedMessage);
    throw "Relocate virtual machine failed";
} else {
    System.log("Virtual machine relocate success");
}
System.log("Virtual machine relocate done");

function getProfileSpecs(policyId) {
    var profileSpecs = new Array();
    if (policyId == "default") {
        profileSpecs[0] = new VcVirtualMachineDefaultProfileSpec();
    } else {
        var definedProfileSpec = new VcVirtualMachineDefinedProfileSpec();
        definedProfileSpec.profileId = policyId;
        profileSpecs[0] = definedProfileSpec;
    }
    return profileSpecs;
}
