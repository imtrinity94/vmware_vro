/**
 * @description Converts a vCloud Director VM object (Vcloud:VM) to its corresponding
 *              vCenter Virtual Machine object (VC:VirtualMachine) by searching the
 *              vCenter inventory using the vCloud VM's UUID.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {Vcloud:VM} vcloudVmObj - The vCloud Director VM object to convert.
 * @returns {VC:VirtualMachine} resolvedVcVirtualMachine - The corresponding vCenter Virtual Machine object.
 */

if (!vcloudVmObj) {
    throw "Source vCloud VM object is null. Conversion aborted.";
}

// Extract the BIOS UUID segment from the vCloud URN (e.g. "urn:vcloud:vm:UUID")
var vmUuidSegment = vcloudVmObj.id.split(":")[3];
System.log("Initiating vCenter lookup for VM BIOS UUID: " + vmUuidSegment);

// Constraint: Searching for BIOS UUID in vCenter using XPath on the 'name' property is a common 
// fallback when direct searchByUuid fails for certain vCD-managed VMs.
var xpathSearchQuery = "xpath:name[contains(.,('" + vmUuidSegment + "'))]";

// Requirement: Search only within the primary local vCenter connection
var pluginUtilHandle = System.getModule("org.telus.xavient.util");
var vcSdkConnectionObj = pluginUtilHandle.getPluginObject("VC:SdkConnection", ["isLocal", "isPrimary"]);

if (!vcSdkConnectionObj) {
    throw "Fatal: Target vCenter SDK connection (Local/Primary) was not resolved.";
}

var matchedInventoryVms = vcSdkConnectionObj.getAllVirtualMachines(null, xpathSearchQuery);
var resolvedVcVirtualMachine = null;

if (matchedInventoryVms && matchedInventoryVms.length > 0) {
    var i;
    for (i = 0; i < matchedInventoryVms.length; i++) {
        var candidateVm = matchedInventoryVms[i];
        
        // Return the first valid match discovered in the SDK collection
        resolvedVcVirtualMachine = candidateVm;
        System.log("Resolution Result: VM successfully mapped to vCenter object '" + resolvedVcVirtualMachine.name + "'");
        break;
    }
} else {
    var lookupErrorMsg = "Inventory Management Error: No vCenter Virtual Machine matches discovered for ID cluster '" + vmUuidSegment + "'";
    System.error(lookupErrorMsg);
    throw lookupErrorMsg;
}

return resolvedVcVirtualMachine;
