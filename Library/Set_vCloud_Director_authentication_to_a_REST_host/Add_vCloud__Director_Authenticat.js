/**
 * Add vCloud™ Director Authenticat
 *
 * @param {REST:RESTHost} host
 * @param {string} sessionMode
 * @param {string} username
 * @param {SecureString} password
 * @param {string} organization
 * @param {string} loginUrl
 * @param {string} version
 * @return {REST:RESTHost} restHost
 */
var authParams = [sessionMode, username, password, organization, loginUrl];
var authenticationObject = RESTAuthenticationManager.createAuthentication(version, authParams);
System.log("REST host authentication: " + authenticationObject);
host.authentication = authenticationObject;
restHost = RESTHostManager.updateHost(host);