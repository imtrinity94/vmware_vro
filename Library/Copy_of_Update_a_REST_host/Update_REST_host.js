/**
 * Update REST host
 *
 * @param {string} accessToken
 * @param {SecureString} accessTokenSecret
 * @param {string} authentication
 * @param {SecureString} authPassword
 * @param {string} authUserName
 * @param {string} consumerKey
 * @param {number} connectionTimeout
 * @param {SecureString} consumerSecret
 * @param {REST:RESTHost} host
 * @param {string} name
 * @param {number} operationTimeout
 * @param {string} url
 * @param {string} sessionMode
 * @param {string} oauth2Token
 * @param {string} workstation
 * @param {string} domain
 * @param {string} proxyHost
 * @param {number} proxyPort
 * @param {boolean} useProxy
 * @param {boolean} hostVerification
 * @param {Configurator:Key} key
 * @param {string} proxyAuthentication
 * @param {string} proxyAuthUserName
 * @param {SecureString} proxyAuthPassword
 * @param {string} proxySessionMode
 * @param {boolean} autoUrlRedirection
 * @return {REST:RESTHost} updatedRestHost
 * @return {string} errorCode
 */
var newHost = host.clone();
newHost.name = name;
newHost.url = url;
newHost.connectionTimeout = connectionTimeout;
newHost.operationTimeout = operationTimeout;
newHost.hostVerification = hostVerification;
if (useProxy) {
	newHost.proxyHost = proxyHost;
	newHost.proxyPort = proxyPort;
} else {
	newHost.proxyHost = null;
	newHost.proxyPort = -1;
}

newHost.setAutoUrlRedirect(autoUrlRedirection);

if ( authentication == "OAuth 1.0" ) {
	var authParams = [consumerKey, consumerSecret, accessToken, accessTokenSecret];
} else if ( authentication == "OAuth 2.0" ) {
	var authParams = [oauth2Token];
} else if ( authentication == "NTLM" ) {
	var authParams = [sessionMode, authUserName, authPassword, workstation, domain];
} else {
	var authParams = [sessionMode, authUserName, authPassword];
}
var authenticationObject = RESTAuthenticationManager.createAuthentication(authentication, authParams);
newHost.authentication = authenticationObject;

var proxyAuthParams = [proxySessionMode, proxyAuthUserName, proxyAuthPassword];
var proxyAuthenticationObject = RESTAuthenticationManager.createAuthentication(proxyAuthentication, proxyAuthParams);
newHost.proxyAuthentication = proxyAuthenticationObject;

if (key != null) {
    System.debug("Will use the following private key id: " + key.id);
    newHost.privateKeyId = key.id;
} else {
    newHost.privateKeyId = null;
}

updatedRestHost = RESTHostManager.updateHost(newHost);
System.log("REST host updated: " + updatedRestHost.url);
