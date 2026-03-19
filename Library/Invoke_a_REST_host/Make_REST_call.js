/**
 * Make REST call
 *
 * @param {REST:RESTHost} restHost
 * @param {string} requestType
 * @param {string} operationUrl
 * @param {string} requestContent
 * @param {string} requestContentType
 * @return {string} errorCode
 * @return {Properties} result
 */
System.log("Host: " + restHost + ", operation: " + operationUrl + ", Request Type: " + requestType.name);

var request = restHost.createRequest(requestType, operationUrl, requestContent, requestContentType);
request.contentType = requestContentType;

System.log("request: " + request.fullUrl);
var response = request.execute();
System.log("response: " + response.contentAsString);
result = new Properties();
result.put("statusCode", response.statusCode);
result.put("contentLength", response.contentLength);
result.put("headers", response.getAllHeaders());
result.put("contentAsString", response.contentAsString);
