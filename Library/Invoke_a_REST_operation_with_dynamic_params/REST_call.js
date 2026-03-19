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
 * @param {string} baseUrl
 * @param {string} user
 * @param {SecureString} password
 * @return {number} statusCode
 * @return {number} contentLength
 * @return {Properties} headers
 * @return {string} contentAsString
 * @return {number} statusCodeAttribute
 */
var inParamtersValues = [param_0, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14];

var response;
var transientOperation = RESTHostManager.createTransientOperationFrom(restOperation);
var request = transientOperation.createRequest(inParamtersValues, content);

System.log("Request: " + request);
System.log("Request URL: " + request.fullUrl);
//set the request content type
request.contentType = defaultContentType;

if (baseUrl != null && baseUrl != "") {
    System.log("Executing request against a new Base URL: " + baseUrl);
    var transientHost = transientOperation.host;
    transientHost.url = baseUrl;
}

if (user != null && user != "") {
    System.log("Executing request with dynamic credentials: " + user);
    response = request.executeWithCredentials(user, password);
} else {
    System.log("Executing request with original credentials.");
    response = request.execute();
}

System.log("Response: " + response);
statusCode = response.statusCode;
statusCodeAttribute = statusCode;
System.log("Status code: " + statusCode);
contentLength = response.contentLength;
headers = response.getAllHeaders();
contentAsString = response.contentAsString;
System.log("Content as string: " + contentAsString);

