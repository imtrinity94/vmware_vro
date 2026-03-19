/**
 * @description Obtains a bearer access token from a Cloud Foundry OAuth API endpoint
 *              using resource owner password credentials grant type.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {string} accessToken - Returns the access_token string from the API response.
 */

// API Credentials and Configuration
var loginUser = "apiServiceUser";
var loginPassword = "secretPassword";

// Retrieve REST operation from configuration
var oauthRestOperation = System.getModule("com.vmware.pso.util").getConfigElementAttributeValue("PSO/PaaS", "REST", "loginApi");
if (!oauthRestOperation) {
    throw "Failed to retrieve OAuth REST operation from configuration element.";
}

var httpMethod = "GET";
var tokenUrlParams = "/oauth/token?grant_type=password&username=" + loginUser + "&password=" + loginPassword;

System.log("Requesting OAuth bearer token from Cloud Foundry...");

var restRequest = oauthRestOperation.createRequest(httpMethod, tokenUrlParams);
restRequest.contentType = "application/x-www-form-urlencoded;charset=utf-8";
restRequest.setHeader("Accept", "application/json;charset=utf-8");

var restResponse = restRequest.execute();

if (restResponse.statusCode !== 200) {
    System.error("OAuth token request failed. Status: " + restResponse.statusCode);
    throw "REST request failed: " + restResponse.contentAsString;
}

var responseJson = JSON.parse(restResponse.contentAsString);
var accessToken = responseJson.access_token;

if (!accessToken) {
    throw "Access token was missing in the response JSON.";
}

System.log("Successfully obtained OAuth bearer token.");

return accessToken;
