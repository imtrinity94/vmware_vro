/**
 * @description Provides examples of using XPath with vRO plugins (vCenter, Server) 
 *              for localized or specific object searches.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {void}
 */

// Example 1: Searching for a Virtual Machine by name (case-sensitive and case-insensitive)
var vmName = "vcova";
var xpathSensitive = "xpath:name[contains(.,'" + vmName + "')]"; // for case-sensitive search
var xpathInsensitive = "xpath:matches(name, '(?i)" + vmName + "')"; // for case-insensitive search
var vms = VcPlugin.getAllVirtualMachines(null, xpathSensitive);
if (vms && vms.length > 0) {
    var foundVM = vms[0];
    System.log("Found VM: " + foundVM.name);
}

// Example 2: Searching for ClusterComputeResources using a case-insensitive match (manual translate)
// Note: clusterName variable is expected to be defined elsewhere or as input
if (typeof clusterName !== 'undefined') {
    var clusters = VcPlugin.getAllClusterComputeResources(null,
        "xpath:matches(translate(name,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), '" + clusterName.toLowerCase() + "')");
}

// Example 3: Improving performance of Datastore retrieval using name prefix filtering
var DsNamePrefix = "DS_MYDATASTORE_";
var DsProps = ['info', 'summary'];
var DsXPath = "xpath:@name[starts-with(.,'" + DsNamePrefix + "')]";
var VcDsArray = VcPlugin.getAllDatastores(DsProps, DsXPath);

// Tip: Convert string to a vRO Object using Server.findAllForType
// Note: vmString variable is expected to be defined elsewhere or as input
if (typeof vmString !== 'undefined') {
    var queryStr = "xpath:name='" + vmString + "'";
    var vmsFromType = Server.findAllForType("VC:VirtualMachine", queryStr);
    if (vmsFromType && vmsFromType.length > 0) {
        var vmObject = vmsFromType[0];
        System.log("Found VM by type: " + vmObject.name);
    }
}

return null;
