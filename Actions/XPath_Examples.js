var vmName = "vcova";
var xpath = "xpath:name[contains(.,'" + vmName +"')]"; //for case-sensitive search
var xpath = "xpath:matches(name, '(?i)" + vmName + "')"); //for case-insensitive search
var vms = VcPlugin.getAllVirtualMachines(null, xpath); 
return vms[0];

////////////////////////////////////////////

var clusters = VcPlugin.getAllClusterComputeResources(null,
	"xpath:matches(translate(name,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), '" + clusterName.toLowerCase() + "')");

//////////////////////////////////////////////

// Set the Datastore name Prefix to search on.
var DsNamePrefix = "DS_MYDATASTORE_";

// Declare which Datastore properties we care about to speed up processing.
var DsProps = ['info', 'summary'];
// Setting the XPATH massively improves performance retrieving the Datastore list.
var XPath = "xpath:@name[starts-with(.,'" + DsNamePrefix + "')]";
	
// Get an array of all the datastores found.
var VcDsArray = VcPlugin.getAllDatastores(DsProps, XPath);

///////////////////////////////////
// Tip: Convert string to a vRO Object
query = "xpath:name='" + vmString + "'"; 
vms=Server.findAllForType("VC:VirtualMachine", query); 
vmObject=vms[0]; 
