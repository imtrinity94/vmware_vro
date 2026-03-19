/**
 * @description Retrieves the primary email address of a user account from vIDM (VMware Identity
 *              Manager) by querying the SCIM API with a bearer token.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * Prerequisites:
 *   - vIDM Server must be added as REST Host in vRealize Orchestrator
 *   - REST HOST must be provided as action input
 *   - vIDM Token must be provided as action input
 *   - username from vIDM Account must be provided as action input
 *
 * @param {REST:RESTHost} restHost - The vIDM REST host.
 * @param {string} idmToken - A valid vIDM bearer access token.
 * @param {string} username - The vIDM username to look up.
 * @returns {string|null} The primary email address, or null if not found or inputs are missing.
 */

if (username && restHost && idmToken) {
    var operationUrl = "SAAS/jersey/manager/api/scim/Users?filter=userName%20eq%20%22" + username + "%22";
    var request = restHost.createRequest("GET", operationUrl, null);
    request.setHeader("Content-type", "application/json");
    request.setHeader("Accept", "application/json, text/plain, */*");
    request.setHeader("Authorization", "Bearer " + idmToken);
    var response = request.execute();
    if (response.statusCode != "200") throw "REST request failed with staus code " + response.statusCode + "\r\nResponse is: " + response.contentAsString;
    if (response.contentAsString) {
        var json = JSON.parse(response.contentAsString);
        System.debug(JSON.stringify(json, null, 4));
        if (json.Resources) {
            if (json.Resources.length == 1) {
                if (json.Resources[0].emails[0]) {
                    return json.Resources[0].emails[0].value;
                } else {
                    throw("No email address for user: " + username + " existing!");
                }
            } else {
                throw("User with name " + username + " not found or not unique!");
            }
        }
    }
    return null;
}
