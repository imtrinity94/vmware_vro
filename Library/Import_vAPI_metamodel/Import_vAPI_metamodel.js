/**
 * Import vAPI metamodel
 *
 * @param {string} endpointUrl
 * @param {string} username
 * @param {SecureString} password
 * @param {boolean} useSecureConnection
 * @param {boolean} addEndpoint
 */
if (endpointUrl == null || endpointUrl.trim().length == 0) {
  throw "'endpointUrl' parameter should not be empty";
}

VAPIManager.importMetamodel(endpointUrl, useSecureConnection, username, password);
System.log("Imported VAPI metamodel from " + endpointUrl);
