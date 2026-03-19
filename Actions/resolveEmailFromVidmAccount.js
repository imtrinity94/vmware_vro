/**
 * @description Retrieves the primary email address of a user account from vIDM (VMware Identity
 *              Manager) by querying the SCIM API with a bearer token.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {REST:RESTHost} vidmRestHost - The vIDM REST host.
 * @param {string} bearerToken - A valid vIDM bearer access token.
 * @param {string} vidmUsername - The vIDM username to look up.
 * @returns {string|null} primaryEmailStr - The primary email address, or null if not found.
 */

if (!vidmUsername || !vidmRestHost || !bearerToken) {
    System.error("Missing mandatory inputs for vIDM email lookup.");
    return null;
}

var scimFilterUrl = "SAAS/jersey/manager/api/scim/Users?filter=userName%20eq%20%22" + vidmUsername + "%22";
var vidmRequest = vidmRestHost.createRequest("GET", scimFilterUrl, null);

vidmRequest.setHeader("Content-type", "application/json");
vidmRequest.setHeader("Accept", "application/json, text/plain, */*");
vidmRequest.setHeader("Authorization", "Bearer " + bearerToken);

System.debug("Querying vIDM for user: " + vidmUsername);
var vidmResponse = vidmRequest.execute();

if (vidmResponse.statusCode !== 200) {
    System.error("vIDM SCIM request failed. Status: " + vidmResponse.statusCode);
    throw "REST error: " + vidmResponse.contentAsString;
}

if (vidmResponse.contentAsString) {
    var scimResponseJson = JSON.parse(vidmResponse.contentAsString);
    
    if (scimResponseJson.Resources && scimResponseJson.Resources.length === 1) {
        var userResource = scimResponseJson.Resources[0];
        if (userResource.emails && userResource.emails.length > 0) {
            var primaryEmailStr = userResource.emails[0].value;
            System.log("Found vIDM email for " + vidmUsername + ": " + primaryEmailStr);
            return primaryEmailStr;
        } else {
            System.warn("No email addresses associated with vIDM user: " + vidmUsername);
        }
    } else {
        System.warn("vIDM user '" + vidmUsername + "' not found or search was not unique.");
    }
}

return null;
