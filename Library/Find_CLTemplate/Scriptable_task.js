/**
 * Scriptable task
 *
 * @param {string} templateName
 * @param {VAPI:VAPIEndpoint} endpoint
 * @return {VAPI:VAPIEndpoint} targetendpoint
 * @return {string} ovfLibraryItemId
 */
if (endpoint == null) {  
   throw "Unable to locate a VAPI endpoint";
 } else {
   targetendpoint=endpoint;
 }

var client = endpoint.client();  
var clib = new com_vmware_content_library(client);  
System.log("The number of libraries on this endpoint is: " + clib.list().length);
   if(clib.list().length >= 1){
     var itemSvc = new com_vmware_content_library_item(client);
     var findItemSpec = new com_vmware_content_library_item_find__spec();
     findItemSpec.name = templateName;
     var results = itemSvc.find(findItemSpec); 
 
     if (!Array.isArray(results) || !results.length) {
       System.log("Template not found on this endpoint");
     } else {
       var details = itemSvc.get(results[0]);
       System.log("Content Library template " + templateName + " found " + (results[0]) + " " + details.type);
       System.log(details);
       targetendpoint = endpoint;
       ovfLibraryItemId = results.shift();
		System.log("Template ID= " +ovfLibraryItemId);
    }
   }
   client.close();