/**
 * Make REST call
 *
 * @param {REST:RESTHost} restHost
 * @param {string} requestType
 * @param {string} operationUrl
 * @param {string} requestContent
 * @param {string} requestContentType
 * @param {string} user
 * @param {string} baseUrl
 * @param {SecureString} password
 * @return {string} errorCode
 * @return {Properties} result
 */
System.log("Host: " + restHost + ", operation: " + operationUrl + ", Request Type: " + requestType);

var transientHost = RESTHostManager.createTransientHostFrom(restHost);

if (baseUrl != null && baseUrl != "") {
    transientHost.url = baseUrl;
}


var req = transientHost.createRequest(requestType, operationUrl, requestContent);
req.contentType = requestContentType;
var resp;

if (user != null && user != "") {
    System.log("Executing request with dynamic credentials: " + user);
    resp = req.executeWithCredentials(user, password);
} else {
    System.log("Executing request with original credentials.");
    resp = req.execute();
}

result = new Properties();
result.put("statusCode", resp.statusCode);
result.put("contentLength", resp.contentLength);
result.put("headers", resp.getAllHeaders());
result.put("contentAsString", resp.contentAsString);

System.log("response: " + resp.contentAsString);
