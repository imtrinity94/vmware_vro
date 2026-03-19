/**
 * Add NTLM Authenticat
 *
 * @param {REST:RESTHost} host
 * @param {string} sessionMode
 * @param {string} username
 * @param {SecureString} password
 * @param {string} workstation
 * @param {string} domain
 * @return {REST:RESTHost} restHost
 */
var authParams = [sessionMode, username, password, workstation, domain];
var authenticationObject = RESTAuthenticationManager.createAuthentication("NTLM", authParams);
System.log("REST host authentication: " + authenticationObject);
host.authentication = authenticationObject;
restHost = RESTHostManager.updateHost(host);