/**
 * Add vCloud™ Director Authenticat
 *
 * @param {REST:RESTHost} host
 * @param {string} sessionMode
 * @param {string} username
 * @param {SecureString} password
 * @param {string} organization
 * @param {string} loginUrl
 * @param {string} type
 * @param {string} apiVersion
 * @return {REST:RESTHost} restHost
 */
var authParams = [sessionMode, username, password, organization, loginUrl, apiVersion];
var authenticationObject = RESTAuthenticationManager.createAuthentication(type, authParams);
System.log("REST host authentication: " + authenticationObject);
host.authentication = authenticationObject;
restHost = RESTHostManager.updateHost(host);