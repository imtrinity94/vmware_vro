/**
 * REST call
 *
 * @param {string} content
 * @param {string} param_0
 * @param {string} param_1
 * @param {string} param_10
 * @param {string} param_11
 * @param {string} param_12
 * @param {string} param_13
 * @param {string} param_14
 * @param {string} param_2
 * @param {string} param_3
 * @param {string} param_4
 * @param {string} param_5
 * @param {string} param_6
 * @param {string} param_7
 * @param {string} param_8
 * @param {string} param_9
 * @param {REST:RESTOperation} restOperation
 * @param {number} statusCodeAttribute
 * @param {string} defaultContentType
 * @param {string} headerParam_0
 * @param {string} headerParam_1
 * @param {string} headerParam_2
 * @param {string} headerParam_3
 * @param {string} headerParam_4
 * @param {string} headerParam_5
 * @param {Array/string} acceptHeaders
 * @return {number} statusCode
 * @return {number} contentLength
 * @return {Properties} headers
 * @return {string} contentAsString
 * @return {number} statusCodeAttribute
 */
var inParamtersValues = [param_0, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14];
var headerParams = [headerParam_0, headerParam_1, headerParam_2, headerParam_3, headerParam_4, headerParam_5];
var acceptHeadersValue = "";
Server.log(restOperation.getHeaderParameters());

var request = restOperation.createRequest(inParamtersValues, content);

//set the request content type]

if (System.getModule("com.vmware.library.http-rest.configuration").hasHttpMethodHasBodyPayload(request.getMethod())) {
   System.log("Setting defaut content type to:  " + defaultContentType );
   request.contentType = defaultContentType;
}

var headerParamNames = restOperation.getHeaderParameters();

// parse the Accept Headers
 System.log(" acceptHeaders " + acceptHeaders );
if (acceptHeaders && acceptHeaders.length > 0) { 
    for (var k in acceptHeaders) {
       acceptHeadersValue = acceptHeadersValue +  acceptHeaders[k] + ",";
    }
    var acceptHeadersStringSize = acceptHeadersValue.length -1 ; 
    acceptHeadersValue = acceptHeadersValue.substring(0, acceptHeadersStringSize);
    // the accept header value shall start with lower-case letter "a" to override the default setted accept header type  
    request.setHeader("accept", acceptHeadersValue);
}

for (var k in headerParamNames) {
   System.log(" SET headers: " + headerParamNames[k] + " : " + headerParams[k]);
   request.setHeader(headerParamNames[k], headerParams[k]);
}

System.log("Request: " + request);
System.log("Request URL: " + request.fullUrl);
var response = request.execute();
System.log("Response: " + response);
statusCode = response.statusCode;
statusCodeAttribute = statusCode;
System.log("Status code: " + statusCode);
contentLength = response.contentLength;
headers = response.getAllHeaders();
contentAsString = response.contentAsString;
System.log("Content as string: " + contentAsString);

System.log("****Headers****");
for each (var header in headers){
	System.log(header.toString());
}


 