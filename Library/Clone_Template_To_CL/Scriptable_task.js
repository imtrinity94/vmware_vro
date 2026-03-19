/**
 * Scriptable task
 *
 * @param {string} vmname
 * @param {VAPI:VAPIEndpoint} endpoint
 * @param {VC:VirtualMachine} vmID
 * @param {string} CLlibraryId
 * @param {string} CLdescription
 * @param {string} CLItemID
 */
// Set the VAPI endpoint to the first endpoint returned
 
if (endpoint == null) {  
  throw "Unable to locate a VAPI endpoint";
}
var client = endpoint.client();  

// Deployment ID
var deployID = new com_vmware_vcenter_ovf_library__item_deployable__identity();
deployID.type = vmID.type
deployID.id = vmID.Id
System.log('vm id is ' +vmID.Id+ ' and VM type is ' +vmID.type)
// CL Template Target 
var createTarget = new com_vmware_vcenter_ovf_library__item_create__target();
if (CLItemID){
createTarget.library_item_id = CLItemID; }
createTarget.library_id = CLlibraryId;

 
// create a ovfSpec  
var createSpec = new com_vmware_vcenter_ovf_library__item_create__spec();
createSpec.name = vmname;
createSpec.description = CLdescription;
   
// Create the ovf  
var ovfSvc = new com_vmware_vcenter_ovf_library__item(client);
var result = ovfSvc.create(null, deployID, createTarget, createSpec); 

client.close();