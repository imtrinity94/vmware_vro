/**
 * @description Executes a generic REST call using a provided REST host. Handles encoding,
 *              headers, authentication retries on 401, and result formatting.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {REST:RESTHost} restHost - The REST host to use for the call.
 * @param {string} url - Target REST API URL (will be encoded).
 * @param {string} [method="GET"] - HTTP method (GET, POST, PUT, etc.).
 * @param {string} [content] - Payload for POST/PUT requests.
 * @param {Properties} [headers] - HTTP headers to include.
 * @returns {Properties} A Properties object containing contentAsString, contentLength, statusCode, and headers.
 */

// VMware vRealize Orchestrator action sample - "restCall"

if (!restHost) {
    throw "No REST Host specified";
}

if (!method) {
    method = "GET";
} else {
    method = method.toUpperCase();
}

// Prepare request
url = encodeURI(url);
var request = (!content || content == "") ? restHost.createRequest(method, url) : restHost.createRequest(method, url, content);
var debugHeaders = "";
if (headers != null && headers instanceof Properties) {
    for each (var i in headers.keys) {
        request.setHeader(k, headers.get(i));
        debugHeaders += i + ":" + headers.get(i) + ";";
    }
}
request.setHeader("Cookie", ""); // Always delete cookie value, vRO REST plugin keeps Cookie by default.
System.log(method + ": " + request.fullUrl);
System.debug(method + ": " + request.fullUrl + "\r\nContent: " + content + "\r\nHeaders: " + debugHeaders);

// Execute Request
var response = request.execute();

// Adding Extra Lines to retry on any REST request that fails due to an expired cookie or authentication failures - Begin
if (response.statusCode == 401) {
    System.error("Retrying request due to authentication failure status code 401.");
    response = request.execute();
}
// Adding Extra Lines to retry on any REST request that fails due to an expired cookie or authentication failures - End

// Debug logs
System.debug("statusCode: " + response.statusCode);
System.debug("contentAsString: " + response.contentAsString);
var debugHeaders = "";
if (response.getAllHeaders() != null) {
    for each (var i in response.getAllHeaders().keys) {
        debugHeaders += i + ":" + response.getAllHeaders().get(i) + " /  ";
    }
}
System.debug("headers: " + debugHeaders);

if (response.statusCode >= 400) {
    throw "[REST CALL] " + method + " '" + request.fullUrl + "' FAILED with statusCode:" + response.statusCode;
}

var result = new Properties();
result.put("contentAsString", response.contentAsString);
result.put("contentLength", response.contentLength);
result.put("statusCode", response.statusCode);
result.put("headers", response.getAllHeaders());

return result;
