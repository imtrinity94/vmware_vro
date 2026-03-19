/**
 * @description Obtains a vIDM (VMware Identity Manager) OAuth2 bearer access token
 *              using client credentials grant type. Returns the token or null if inputs
 *              are missing.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * Prerequisites:
 *   - vIDM Server must be added as REST Host in vRealize Orchestrator
 *   - vIDM username and password must be provided as action inputs
 *   - REST Host must be provided as action input
 *
 * @param {REST:RESTHost} restHost - The vIDM REST host.
 * @param {string} username - The vIDM client ID.
 * @param {string} password - The vIDM client secret.
 * @returns {string|null} The access token string, or null if inputs are not provided.
 */

if (username && password && restHost) {
    // Get Token
    var requestType = "POST";
    var operationUrl = "SAAS/auth/oauthtoken?grant_type=client_credentials&client_id=" + username + "&client_secret=" + password;
    var request = restHost.createRequest(requestType, operationUrl, null);
    request.setHeader("Content-type", "application/json");
    var response = request.execute();
    if (response.statusCode != 200) throw "REST request failed with staus code " + response.statusCode + "\r\nResponse is: " + response.contentAsString;
    var json = JSON.parse(response.contentAsString);
    idmToken = json.access_token;
}
if (idmToken) return idmToken;
return null;
