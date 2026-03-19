/**
 * Set Storage Policies To Virtual Machine
 *
 * @param {number} sleepTime
 * @param {Array/string} storageObjects
 * @param {Array/string} storagePoliciesUuids
 * @param {VC:VirtualMachine} vCenterVM
 */
var vmConfigSpec = new VcVirtualMachineConfigSpec();

// Get all disks
var disks = System.getModule("com.vmware.library.spbm").getVMDisks(vCenterVM);

// Set config spec
var deviceChanges = new Array();
for (var i in storageObjects) {
    var object = storageObjects[i];
    var policyId = storagePoliciesUuids[i];
    if (object == "vmhome") {
        // Set VM Home storage policy
        vmConfigSpec.vmProfile = getProfileSpecs(policyId);
    } else {
        // Set disks storage policies
        var diskIndex = parseInt(object.substr(4));
        var deviceConfigSpec = new VcVirtualDeviceConfigSpec();
        deviceConfigSpec.device = disks[diskIndex];
        deviceConfigSpec.operation = VcVirtualDeviceConfigSpecOperation.edit;
        deviceConfigSpec.profile = getProfileSpecs(policyId);
        deviceChanges.push(deviceConfigSpec);
    }
}
if (deviceChanges.length > 0) {
    vmConfigSpec.deviceChange = deviceChanges;
}

// Set storage policies
var reconfigVMTask = vCenterVM.reconfigVM_Task(vmConfigSpec);
while (reconfigVMTask.info.state.value == "queued" || reconfigVMTask.info.state.value == "running") {
    System.sleep(sleepTime);
}
if (reconfigVMTask.info.state.value == "error") {
    System.log("Set storage policies to virtual machine failed: " + reconfigVMTask.info.error.localizedMessage);
    throw "Set storage policies to virtual machine failed";
} else {
    System.log("Set storage policy success");
}

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
