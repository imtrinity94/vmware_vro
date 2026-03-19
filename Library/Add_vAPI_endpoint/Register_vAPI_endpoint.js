/**
 * Register vAPI endpoint
 *
 * @param {string} endpointUrl
 * @param {string} username
 * @param {SecureString} password
 * @param {boolean} useSecureConnection
 */
if (endpointUrl == null || endpointUrl.trim().length == 0) {
  throw "'endpointUrl' parameter should not be empty";
}

var endpoint = VAPIManager.addEndpoint(endpointUrl, useSecureConnection, username, password);
if (endpoint == null) {
  throw "vAPI endpoint registration failed";
}
System.log("Successfully added VAPI Endpoint -> " + endpoint);
