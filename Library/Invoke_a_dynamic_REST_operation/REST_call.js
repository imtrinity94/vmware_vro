/**
 * REST call
 *
 * @param {number} statusCodeAttribute
 * @param {string} content
 * @param {string} contentType
 * @param {string} baseUrl
 * @param {string} user
 * @param {SecureString} password
 * @param {string} queryString
 * @param {string} errorCode
 * @param {string} httpMethod
 * @return {number} statusCode
 * @return {number} contentLength
 * @return {Properties} headers
 * @return {string} contentAsString
 * @return {number} statusCodeAttribute
 */
var restHost = RESTHostManager.createHost("DynamicRequest");
var transientHost = RESTHostManager.createTransientHostFrom(restHost);
transientHost.url = baseUrl;

if (user != null && user != "") {
	var authParams = ["Per User Session", user, password];
    var authenticationObject = RESTAuthenticationManager.createAuthentication("Basic", authParams);
    transientHost.authentication = authenticationObject;
}

var requestUrl = baseUrl + queryString;
System.log("Request full URL: " + requestUrl);
var request = transientHost.createRequest(httpMethod, queryString, content);
request.contentType = contentType;

var response;

if (user != null && user != "") {
    System.log("Executing REST request with dynamic credentials: " + user);
    System.log("Query string: " + request.url);
    System.log("Base URL: " + request.host.url);
    response = request.executeWithCredentials(user, password);
} else {
    response = request.execute();
}

System.log("Content as string: " + response.contentAsString);

statusCode = response.statusCode;
statusCodeAttribute = statusCode;
System.log("Status code: " + statusCode);
contentLength = response.contentLength;
headers = response.getAllHeaders();
contentAsString = response.contentAsString;
System.log("Content as string: " + contentAsString);

