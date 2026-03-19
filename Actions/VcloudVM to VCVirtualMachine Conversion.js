/**
 * @description Converts a vCloud Director VM object (Vcloud:VM) to its corresponding
 *              vCenter Virtual Machine object (VC:VirtualMachine) by searching the
 *              vCenter inventory using the vCloud VM's UUID.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {Vcloud:VM} vCloudVM - The vCloud Director VM object to convert.
 * @returns {VC:VirtualMachine} VCVM - The corresponding vCenter Virtual Machine object.
 */

// VclVM to VcVirtualMachine Conversion

var vmId = vCloudVM.id.split(":")[3];
var XPath = "xpath:name[contains(.,('" + vmId + "'))]";
var vCenterServer = System.getModule("org.telus.xavient.util").getPluginObject("VC:SdkConnection", ["isLocal", "isPrimary"]);
var allVMs = vCenterServer.getAllVirtualMachines(null, XPath);

if (allVMs.length != 0) {
    for each (var vm in allVMs) {
        VCVM = vm;
        var VM_NAME = vm.name;
        System.log("[Info]: Found Virtual Machine in vCenter: " + VCVM.name);
        break;
    }
} else {
    System.warn("ERROR: VM Not Found with the id: '" + vmId + "'");
    throw "ERROR: VM Not Found with the id: '" + vmId + "'";
}
