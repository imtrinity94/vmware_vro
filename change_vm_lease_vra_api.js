/*
VREALIZE AUTOMATION BULK UPDATE LEASE ON VIRTUAL MACHINES
I wrote a workflow that takes some inputs and uses an ODATA query to list all virtual machines where their lease is expiring within a certain time frame.

It uses the API to get all the virtual machines and then you can bulk update these lease days by changing the value for the numberOfDaysToAdd variable.

You will need to add the vCACCAFE:vCACHOST value for the host attribute and also make sure that the plugin user configure has the right privileges and entitlements.

*/


var operationName = "Change Lease";
var numberOfDaysToAdd = 30;
var leaseEndDate = "2017-08-15T00:00:00.000Z";
var pageSizeLimit = "20"
var endpoint = "com.vmware.csp.core.cafe.catalog.api";
var restClient = host.createRestClient(endpoint);
 
var pages = parseJson(api());
System.log("Number of pages found from API query: " + pages.metadata.totalPages);
 
for (i=1; i-1 < pages.metadata.totalPages; i++){
 
var json = parseJson(api(i));
if (i >1) {
System.log("Processing page " + i + " of pages." + metadata.totalPages + " . Sleeping for 60 seconds whilst vRA processes change lease operations.");
System.sleep(60000);
}
 
for each (deployment in json.content){
System.log("Found Deployment: " + deployment.name);
var catalogResource = vCACCAFEEntitiesFinder.findCatalogResources(host , deployment.name)[0];
 
System.log("Found catalog Resource " + catalogResource.name);
 
var newLeaseDate = new Date();
newLeaseDate.setDate(newLeaseDate.getDate() + numberOfDaysToAdd);
 
System.log("Setting new lease date to " + newLeaseDate);
 
var myvCACCAFEDateTimeLiteral = new vCACCAFEDateTimeLiteral(newLeaseDate) ;
 
//Get all the operations that are available on the deployment
var operations = catalogResource.getOperations();
var resourceActionNotFound = false;
 
//Locate the deployment specific operations and store it
for each (operation in operations){
System.log(workflow.currentWorkflow.name + ": " + operation.getName() + " operation is available on this catalog resource")
if (operation.getName().toLowerCase() == operationName.toLowerCase()){
System.log(workflow.currentWorkflow.name + ": " + operation.getName() + " operation identified and selected");
resourceActionNotFound = true;
break;
}
}
if (resourceActionNotFound == false) {continue};
 
var inputs = new Properties();
inputs.put("provider-ExpirationDate", myvCACCAFEDateTimeLiteral);
 
System.getModule("com.vmware.library.vcaccafe.request").requestResourceAction(operation,inputs)
 
}
}
 
function api(page){
 
var url = "consumer/resources?&limit=" + pageSizeLimit;
if (page) url = url + "&page=" + page.toString();
var catItemsUrl = url + "&$filter=resourceType/id eq 'composition.resource.type.deployment' and lease/end lt '" + leaseEndDate + "'";
var catItems = restClient.get(catItemsUrl);
return catItems.getBodyAsString();
 
}
 
function parseJson(res){
 
return JSON.parse(res.replace(/\\/g, '').replace(/\\t/g, '').replace(/\\r/g, '').replace(/\\n/g, ''));
}
