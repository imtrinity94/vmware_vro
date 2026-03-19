/**
 * @description Demonstrates how to make a REST API call without needing a pre-configured
 *              HTTP-REST host in vRO. Creates a transient REST host dynamically, applies
 *              Basic authentication, and executes the request.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

// Implementation Configuration
var httpMethodStr = "GET";
var targetApiUri = "https://infoblox.com/wapi/v2.7/ipv4address?_return_fields=fingerprint,names,ip_address&status=USED&network=10.0.0.0/24";
var requestPayloadBody = "";
var mediaTypeJson = "application/json";
var apiAuthUser = "user";
var apiAuthPassword = "password";

System.log("Creating dynamic REST Host for request to: " + targetApiUri);

// Create a transient REST host from a temporary template host
var templateRestHost = RESTHostManager.createHost("dynamicRequestTemplate");
templateRestHost.operationTimeout = 600;

var transientRestHost = RESTHostManager.createTransientHostFrom(templateRestHost);
transientRestHost.operationTimeout = 600;
transientRestHost.url = targetApiUri;

var dynamicRequest = transientRestHost.createRequest(httpMethodStr, targetApiUri, requestPayloadBody);

// Configure Basic Authentication
var authCredentialsParams = ["Shared Session", apiAuthUser, apiAuthPassword];
var restAuthenticationObj = RESTAuthenticationManager.createAuthentication("Basic", authCredentialsParams);
transientRestHost.authentication = restAuthenticationObj;

// Configure Request Metadata
dynamicRequest.contentType = mediaTypeJson;

System.log("Executing " + httpMethodStr + " request targeting: " + dynamicRequest.fullUrl);

var apiResponseObj = dynamicRequest.execute();

// Audit and Log Results
var responseStatusCode = apiResponseObj.statusCode;
System.log("Response Received. Status Code: " + responseStatusCode);

var responsePayloadText = apiResponseObj.contentAsString;
if (responseStatusCode === 200) {
    System.debug("Response Content Preview: " + (responsePayloadText ? responsePayloadText.substring(0, 500) : "Empty"));
} else {
    System.error("Request failed with status " + responseStatusCode + ". Payload: " + responsePayloadText);
}

return null;
