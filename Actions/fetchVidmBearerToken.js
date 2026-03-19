/**
 * @description Obtains a vIDM (VMware Identity Manager) OAuth2 bearer access token
 *              using client credentials grant type. Returns the token or null if inputs
 *              are missing.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {REST:RESTHost} vidmRestHost - The vIDM REST host.
 * @param {string} clientId - The vIDM client ID.
 * @param {string} clientSecret - The vIDM client secret.
 * @returns {string|null} vidmAccessToken - The access token string, or null if inputs are not provided.
 */

var vidmAccessToken = null;

if (clientId && clientSecret && vidmRestHost) {
    System.log("Requesting vIDM access token from REST host: " + vidmRestHost.name);
    
    var httpMethod = "POST";
    var oauthUrlPath = "SAAS/auth/oauthtoken?grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret;
    
    var tokenRequest = vidmRestHost.createRequest(httpMethod, oauthUrlPath, null);
    tokenRequest.setHeader("Content-type", "application/json");

    var tokenResponse = tokenRequest.execute();

    if (tokenResponse.statusCode !== 200) {
        System.error("vIDM token request failed. Status: " + tokenResponse.statusCode);
        throw "REST error: " + tokenResponse.contentAsString;
    }

    var responsePayloadJson = JSON.parse(tokenResponse.contentAsString);
    vidmAccessToken = responsePayloadJson.access_token;
} else {
    System.warn("Required inputs (clientId, clientSecret, restHost) were not provided for vIDM token retrieval.");
}

if (vidmAccessToken) {
    System.debug("Successfully received vIDM bearer token.");
    return vidmAccessToken;
}

return null;
