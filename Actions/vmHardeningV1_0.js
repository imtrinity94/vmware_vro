/**
 * Applies VM hardening configurations (extraConfig options) and performs vMotion/storage vMotion relocation.
 * Processes an array of virtual machines and an array of configuration key-value pairs.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VC:VirtualMachine[]} targetVmsList - Array of vCenter VMs to process.
 * @param {Properties[]} hardeningConfigsArray - Array of properties containing 'key' and 'value' for extraConfig.
 * @param {VC:VirtualMachineRelocateSpec} relocationSpecObj - The relocation specification for vMotion.
 * @param {boolean} [showProgressFlags] - Show progress in logs.
 * @param {number} [taskPollRateSec] - Task polling rate in seconds.
 * @returns {void}
 */

var vmConfigUpgradeSpec = new VcVirtualMachineConfigSpec();  
var extraConfigOptionsBuffer = [];

System.log("Stage 1: Constructing Hardening Configuration Template");
var i;
for (i = 0; i < hardeningConfigsArray.length; i++) {
    var configEntry = hardeningConfigsArray[i];
    System.log(" -> Policy Rule: " + configEntry.key + " = " + configEntry.value);
    
    var optionValueObj = new VcOptionValue();
    optionValueObj.key = configEntry.key;
    optionValueObj.value = configEntry.value;
    extraConfigOptionsBuffer.push(optionValueObj);
}

vmConfigUpgradeSpec.extraConfig = extraConfigOptionsBuffer;

System.log("Stage 2: Initiating Hardening and Relocation for " + targetVmsList.length + " VM(s)");

var j;
for (j = 0; j < targetVmsList.length; j++) {
    var vcVirtualMachineItem = targetVmsList[j];
    System.log("--- Processing Managed Entity: " + vcVirtualMachineItem.name + " ---");
    
    // Phase A: Apply Security Reconfiguration
    System.log("Applying ExtraConfig hardening spec...");
    var reconfigTaskObj = vcVirtualMachineItem.reconfigVM_Task(vmConfigUpgradeSpec);
    
    try {
        System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(reconfigTaskObj, showProgressFlags, taskPollRateSec);
        System.log("Hardening policy committed successfully for: " + vcVirtualMachineItem.name);
    } catch (reconfigEx) {
        System.error("Critical Failure: Configuration commit rejected for '" + vcVirtualMachineItem.name + "'. Reason: " + reconfigEx);
        // Action decision: The original logic proceeds to relocation even if configuration fails. 
        // In a production environment, one might choose to 'continue' (skip this VM) instead.
    }
    
    // Phase B: Execute Relocation (vMotion / storage vMotion)
    // Relocation is often required to 'bake in' certain extraConfig changes or as part of a maintenance cycle.
    System.log("Commencing VM relocation sequence...");
    var relocateTaskObj = vcVirtualMachineItem.relocateVM_Task(relocationSpecObj);
    
    try {
        System.getModule("com.vmware.library.vc.basic").vim3WaitTaskEnd(relocateTaskObj, showProgressFlags, taskPollRateSec);
        System.log("Relocation task finalized for: " + vcVirtualMachineItem.name);
    } catch (relocateEx) {
        System.error("Operational Failure: Relocation task failed for '" + vcVirtualMachineItem.name + "'. Reason: " + relocateEx);
    }
}

System.log("VM Hardening and Relocation batch cycle terminated.");

return null;
