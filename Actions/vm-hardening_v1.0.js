/**
 * Applies VM hardening configurations (extraConfig options) and performs vMotion/storage vMotion relocation.
 * Processes an array of virtual machines and an array of configuration key-value pairs.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine[]} VcVmS Array of vCenter VMs to process.
 * @param {Properties[]} VcVmConfig Array of properties containing 'key' and 'value' for extraConfig.
 * @param {VC:VirtualMachineRelocateSpec} relocateSpec The relocation specification for vMotion.
 * @param {boolean} progress Show progress in logs.
 * @param {number} pollrate Task polling rate in seconds.
 * @returns {void}
 */

var vcVMConfigSpec = new VcVirtualMachineConfigSpec();  
var changeValue = new Array();

System.log("Building Config Spec from input array:");
for (var i = 0; i < VcVmConfig.length; i++) {
    System.log(" - " + VcVmConfig[i].key + " = " + VcVmConfig[i].value);
    var option = new VcOptionValue();
    option.key = VcVmConfig[i].key;
    option.value = VcVmConfig[i].value;
    changeValue.push(option);
}

vcVMConfigSpec.extraConfig = changeValue;
System.log("Number of VMs to process: " + VcVmS.length);

for (var j = 0; j < VcVmS.length; j++) {
    var vm = VcVmS[j];
    System.log("Processing VM: " + vm.name);
    
    // Step 1: Reconfigure Options
    var configTask = vm.reconfigVM_Task(vcVMConfigSpec);
    try {
        System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(configTask, progress, pollrate);
        System.log("Hardening configuration applied for VM: " + vm.name);
    } catch (e) {
        System.error("Hardening configuration failed for VM: " + vm.name + ". Reason: " + e);
        // Continue to next VM or skip relocation if config failed? 
        // Original logic attempts relocation anyway.
    }
    
    // Step 2: Relocate VM
    var moveTask = vm.relocateVM_Task(relocateSpec);
    try {
        System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(moveTask, progress, pollrate);
        System.log("vMotion/storage vMotion completed for VM: " + vm.name);
    } catch (e) {
        System.error("vMotion/storage vMotion failed for VM: " + vm.name + ". Reason: " + e);
    }
}
