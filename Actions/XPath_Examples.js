/**
 * Provides examples of using XPath with vRO plugins (vCenter, Server) 
 * for localized or specific object searches.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 */

// Example 1: Searching for a Virtual Machine by name (case-sensitive and case-insensitive)
var vmName = "vcova";
var xpathSensitive = "xpath:name[contains(.,'" + vmName + "')]"; // for case-sensitive search
var xpathInsensitive = "xpath:matches(name, '(?i)" + vmName + "')"; // for case-insensitive search
var vms = VcPlugin.getAllVirtualMachines(null, xpathSensitive);
var foundVM = vms[0];

////////////////////////////////////////////

// Example 2: Searching for ClusterComputeResources using a case-insensitive match (manual translate)
var clusters = VcPlugin.getAllClusterComputeResources(null,
    "xpath:matches(translate(name,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), '" + clusterName.toLowerCase() + "')");

//////////////////////////////////////////////

// Example 3: Improving performance of Datastore retrieval using name prefix filtering
// Set the Datastore name Prefix to search on.
var DsNamePrefix = "DS_MYDATASTORE_";

// Declare which Datastore properties we care about to speed up processing.
var DsProps = ['info', 'summary'];
// Setting the XPATH massively improves performance retrieving the Datastore list.
var XPath = "xpath:@name[starts-with(.,'" + DsNamePrefix + "')]";

// Get an array of all the datastores found.
var VcDsArray = VcPlugin.getAllDatastores(DsProps, XPath);

///////////////////////////////////

// Tip: Convert string to a vRO Object using Server.findAllForType
var query = "xpath:name='" + vmString + "'";
var vmsFromType = Server.findAllForType("VC:VirtualMachine", query);
var vmObject = vmsFromType[0];
