/**
 * Clone host
 *
 * @param {string} accessToken
 * @param {string} authentication
 * @param {SecureString} authPassword
 * @param {string} authUserName
 * @param {number} connectionTimeout
 * @param {string} consumerKey
 * @param {SecureString} consumerSecret
 * @param {REST:RESTHost} host
 * @param {string} name
 * @param {number} operationTimeout
 * @param {string} url
 * @param {string} sessionMode
 * @param {string} oauth2Token
 * @param {SecureString} accessTokenSecret
 * @param {string} workstation
 * @param {string} domain
 * @param {string} proxyHost
 * @param {number} proxyPort
 * @param {boolean} useProxy
 * @param {string} tokenSendingStrategy
 * @return {REST:RESTHost} newHost
 * @return {string} errorCode
 */
newHost = host.newHostFromThis();
newHost.name = name;
newHost.url = url;
newHost.connectionTimeout = connectionTimeout;
newHost.operationTimeout = operationTimeout;
if (useProxy) {
	newHost.proxyHost = proxyHost;
	newHost.proxyPort = proxyPort;
} else {
	newHost.proxyHost = null;
	newHost.proxyPort = -1;
}
if ( authentication == "OAuth 1.0" ) {
	var authParams = [consumerKey, consumerSecret, accessToken, accessTokenSecret];
} else if ( authentication == "OAuth 2.0" ) {
	if (!tokenSendingStrategy) {
		var authParams = [oauth2Token];
	} else {
		var authParams = [oauth2Token, tokenSendingStrategy];
	}
} else if ( authentication == "NTLM" ) {
	var authParams = [sessionMode, authUserName, authPassword, workstation, domain];
} else {
	var authParams = [sessionMode, authUserName, authPassword];
}
var authenticationObject = RESTAuthenticationManager.createAuthentication(authentication, authParams);
System.log("REST host authentication: " + authenticationObject);
newHost.authentication = authenticationObject;
System.log("Saving newHost: " + newHost);
newHost = RESTHostManager.addHost(newHost);