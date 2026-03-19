/**
 * De Register
 *
 * @param {REST:RESTHost} restHost
 * @param {string} token
 */
// This action deletes the endpoint type and category in vRA

var IPAMEndpointTypeId = "Infoblox";
var IPAM_CATEGORY_ID = "IPAM";

try
{
	System.log("Deregistering IPAM endpoint Type \"" + IPAMEndpointTypeId + "\" in category \"" + IPAM_CATEGORY_ID + "\"");
	System.log("Deregistering IPAM endpoint Type \"" + IPAMEndpointTypeId + "\"");
	deleteEndpointType(IPAMEndpointTypeId, IPAM_CATEGORY_ID);
	try
	{
		System.log("Deregistering IPAM endpoint category \"" + IPAM_CATEGORY_ID + "\"");
		deleteEndpointCategory(IPAM_CATEGORY_ID);
		System.log("Dreregister IPAM endpoint: Success");
	}
	catch (Error)
	{		
		System.log("Deregistering IPAM category Failed. Please check it is not in use.");
		throw "Deregister IPAM category failed";
	}
}
catch (Error)
{
	System.log("Deregistering IPAM endpoint Type Failed. Please check it is not in use.");
	throw "Deregister IPAM type failed";
}







/*
*   Deletes endpoint category - IPAM
*/
function deleteEndpointCategory(categoryId) {

	var category = {};
	category.id = categoryId;
	category.name = categoryId;

	var responseContent = System.getModule("com.vmware.library.vra.rest").executeRestAction(
			restHost,
			"DELETE", // the DELETE semantic will delete a category if it exists
			"/endpoint-configuration-service/api/categories/" + categoryId,
			JSON.stringify(category),
			"application/json",
			token);		
	
}

/*
*   Deletes endpoint type based on user input
*/
function deleteEndpointType(typeId, categoryId) {

	
	var DEFAULT_ENDPOINT_TYPE_SCHEMA_ID = "ipam_endpoint_class_id";
	var responseContentEndpointTypeSchema = System.getModule("com.vmware.library.vra.rest").executeRestAction(
		restHost,
		"GET",
		"/ipam-service/api/data-service/schema/" + DEFAULT_ENDPOINT_TYPE_SCHEMA_ID + "/default",
		null,
		"application/json",
		token);

	var endpointType = {};
	var endpointTypeSchema = eval("(" + responseContentEndpointTypeSchema + ')');
	endpointType.id = typeId;
	endpointType.category = categoryId;
	endpointType.description = typeId;
	endpointType.displayName = typeId;
	endpointType.tenantable = false;
	endpointType.tenantId = null;
	setDefaultValueForWorkflowOrAction(endpointTypeSchema, "Get IP Ranges", "com.infoblox.integrated.ipam.getIPRanges");
	setDefaultValueForWorkflowOrAction(endpointTypeSchema, "Get Address Spaces", "com.infoblox.integrated.ipam.getAddressSpaces");
	setDefaultValueForWorkflowOrAction(endpointTypeSchema, "Create IP Ranges", "8c9a7501-31e3-49e7-9eb1-1de62f9a275d");
	setDefaultValueForWorkflowOrAction(endpointTypeSchema, "Delete IP Ranges", "f43342c7-de43-4fc7-91d8-72c948637a16");
	setDefaultValueForWorkflowOrAction(endpointTypeSchema, "Allocate", "9df8f3ae-9187-4b74-bf85-d281917dac4d");
	setDefaultValueForWorkflowOrAction(endpointTypeSchema, "Release", "046e38ae-9a58-4bd6-90f3-baeb051d8629");
	endpointType.schema = endpointTypeSchema;
	
	// make a call to delete endpoint type
	var responseContent = System.getModule("com.vmware.library.vra.rest").executeRestAction(
		restHost,
		"DELETE", // the DELETE semantic will delete a type if it exists
		encodeURI("/endpoint-configuration-service/api/types/" + typeId),
		JSON.stringify(endpointType),
		"application/json",
		token);
	
}




// find child object by value of the "id" property
function findChildObjectById(obj, id) {
  var result = null
  for (k in obj) {
		if (obj[k] !== null && typeof(obj[k])== "object") {
            result = findChildObjectById(obj[k],id);
        } else if (k == "id" && obj[k] == id) {
			result = obj;
        }
		if (result != null) {
		   // return the first match, assume that id is unique
		   return result;
		}
   }
  return result;
}

// This function updates the default value of a workflow or action id in the schema object
// jsonPath equivalent of "$..[?(@.id=='Get IP Ranges')]..[?(@.id=='id')].state.facets[0].value.value.value";
function setDefaultValueForWorkflowOrAction(schemaObj, operation, newValue) {

   var firstMatchingNode = findChildObjectById(schemaObj, operation);
   if (firstMatchingNode == null) {
       throw "Could not find child object with id=" + operation;
   }

   var secondNode = findChildObjectById(firstMatchingNode, "id");
   // we found it; set the default value
   if (secondNode == null) {
       throw "Could not find child object with id=\"id\"";
   }
   // this is where the default is in the schema
   secondNode.state.facets[0].value.value.value = newValue;
   System.debug("Set new default value " + newValue + " for workflow or action " + operation);
}
	
