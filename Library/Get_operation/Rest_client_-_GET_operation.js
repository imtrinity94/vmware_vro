/**
 * Simple task with custom script capability.
 *
 * @param {string} pathUri
 * @param {Properties} inputHeaders
 * @param {VRA:Host} host
 * @return {number} statusCode
 * @return {string} contentAsString
 * @return {number} statusCodeAttribute
 * @return {Array/string} headers
 * @return {string} statusMessage
 */
var restClient = host.createRestClient();
var request = restClient.createRequest("GET", pathUri, null);
var keys = inputHeaders.keys;
for(var key in keys){
    request.setHeader(keys[key], inputHeaders.get(keys[key]));
    System.log("Value for key: "+keys[key] +" is: "+inputHeaders.get(keys[key]));
}
var response = restClient.execute(request);

System.log("****Status Code****");
statusCode = response.statusCode;
System.log("Status code: " + statusCode);

statusCodeAttribute = statusCode;

statusMessage = response.statusMessage;
System.log("****Status Message****");
System.log("Status Message: " + statusMessage);

contentAsString = response.contentAsString;
System.log("****Content  String****");
System.log("Content as string: " + contentAsString);

headers = response.getHeaderValues("Access-Control-Allow-Headers");
System.log("****Headers****");
for each (var header in headers){
	System.log(header.toString());
}

System.log("****All Headers****");
for each (var header in response.allHeaders){
	System.log(header.toString());
}
