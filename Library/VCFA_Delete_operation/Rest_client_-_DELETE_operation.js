/**
 * Simple task with custom script capability.
 *
 * @param {string} pathUri
 * @param {string} payload
 * @param {VCFA:Host} host
 * @param {Properties} inputHeaders
 * @return {string} contentAsString
 * @return {number} statusCode
 * @return {number} statusCodeAttribute
 * @return {string} statusMessage
 */
var restClient = host.createRestClient();

var request = restClient.createRequest("DELETE", pathUri, null);
var keys = inputHeaders.keys;
for(var key in keys){
    request.setHeader(keys[key], inputHeaders.get(keys[key]));
    //System.log("Value for key: "+keys[key] +" is: "+inputHeaders.get(keys[key]));
}
/*
request.setHeader("Accept", "application/json;version=" + apiVersion);
request.setHeader("Content-Type", "application/json");
//request.setHeader("X-VMWARE-VCLOUD-AUTH-CONTEXT", "System"); 
request.setHeader("X-VMWARE-VCLOUD-TENANT-CONTEXT", tenantContext);
*/
var response = restClient.execute(request);

statusCode = response.statusCode;
System.log("Status code: " + statusCode);
statusCodeAttribute = statusCode;
statusMessage = response.statusMessage;

contentAsString = response.contentAsString;
System.log("Content as string: " + contentAsString);