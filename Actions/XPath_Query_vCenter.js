var vmName = "vcova";
// XPath expression for VM name exactly matching the given string
// var xpath = "xpath:name='" + vmName + "'"; 
// XPath expression for VM name starting with the given string 
// var xpath = "xpath://name[starts-with(.,'" + vmName +"')]"; 
// XPath expression for VM name containing the given string as a substring 
var xpath = "xpath:name[contains(.,'" + vmName +"')]";
 var vms = VcPlugin.getAllVirtualMachines(null, xpath); 
if (vms == null) { 
 System.log("No VMs found"); 
} else { 
 for each (var vm in vms) { 
 System.log("Found VM: " + vm.name); 
 } 
}
