/**
 * @description Executes a generic REST call using a provided REST host. Handles encoding,
 *              headers, authentication retries on 401, and result formatting.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {REST:RESTHost} apiHost - The REST host to use for the call.
 * @param {string} apiPath - Target REST API path or URL (will be encoded).
 * @param {string} [httpMethod="GET"] - HTTP method (GET, POST, PUT, etc.).
 * @param {string} [payload] - Body content for POST/PUT requests.
 * @param {Properties} [customHeaders] - HTTP headers to include.
 * @returns {Properties} A Properties object containing contentAsString, contentLength, statusCode, and headers.
 */

if (!apiHost) {
    throw "REST Host is required for this action.";
}

var finalMethod = (httpMethod) ? httpMethod.toUpperCase() : "GET";

// Prepare request
var encodedPath = encodeURI(apiPath);
var restRequestObj = (!payload || payload === "") ? apiHost.createRequest(finalMethod, encodedPath) : apiHost.createRequest(finalMethod, encodedPath, payload);

var headersDebugInfo = "";

if (customHeaders != null && customHeaders instanceof Properties) {
    var headerKeysList = customHeaders.keys;
    var i;
    for (i = 0; i < headerKeysList.length; i++) {
        var hKey = headerKeysList[i];
        var hVal = customHeaders.get(hKey);
        restRequestObj.setHeader(hKey, hVal);
        headersDebugInfo += hKey + ": " + hVal + "; ";
    }
}

// Clear cookies to avoid session pollution (standard vRO REST plugin behavior)
restRequestObj.setHeader("Cookie", "");

System.log("Executing " + finalMethod + " request to: " + restRequestObj.fullUrl);
System.debug("Headers: " + headersDebugInfo);
if (payload) System.debug("Payload: " + payload);

// Execute Request
var restResponseObj = restRequestObj.execute();

// Authentication Retry Logic (vRO REST plugin specific 401 handling)
if (restResponseObj.statusCode === 401) {
    System.warn("Authentication failure (401). Retrying request...");
    restResponseObj = restRequestObj.execute();
}

// Log response details
System.debug("Response Status: " + restResponseObj.statusCode);
System.debug("Response Body: " + restResponseObj.contentAsString);

var responseHeaders = restResponseObj.getAllHeaders();
if (responseHeaders != null) {
    var responseHeaderKeys = responseHeaders.keys;
    var j;
    for (j = 0; j < responseHeaderKeys.length; j++) {
        var respKey = responseHeaderKeys[j];
        System.debug("Response Header - " + respKey + ": " + responseHeaders.get(respKey));
    }
}

if (restResponseObj.statusCode >= 400) {
    throw "REST API call FAILED. Status: " + restResponseObj.statusCode + " URL: " + restRequestObj.fullUrl;
}

var resultProperties = new Properties();
resultProperties.put("contentAsString", restResponseObj.contentAsString);
resultProperties.put("contentLength", restResponseObj.contentLength);
resultProperties.put("statusCode", restResponseObj.statusCode);
resultProperties.put("headers", responseHeaders);

return resultProperties;
