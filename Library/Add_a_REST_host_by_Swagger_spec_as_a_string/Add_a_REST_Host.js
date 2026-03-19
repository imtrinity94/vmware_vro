/**
 * Add a REST Host
 *
 * @param {string} workstationu
 * @param {string} swaggerSpecString
 * @param {string} sessionMode
 * @param {string} proxySessionMode
 * @param {number} proxyPort
 * @param {string} proxyHost
 * @param {string} proxyAuthUserName
 * @param {SecureString} proxyAuthPassword
 * @param {string} proxyAuthentication
 * @param {string} preferredCommunicationProtocol
 * @param {string} preferredAcceptHeader
 * @param {number} operationTimeout
 * @param {string} oauth2Token
 * @param {string} name
 * @param {Configurator:Key} key
 * @param {boolean} hostVerification
 * @param {string} host
 * @param {string} domain
 * @param {string} defaultContentType
 * @param {SecureString} consumerSecret
 * @param {string} consumerKey
 * @param {number} connectionTimeout
 * @param {string} basePath
 * @param {string} authUserName
 * @param {SecureString} authPassword
 * @param {string} authentication
 * @param {SecureString} accessTokenSecret
 * @param {string} accessToken
 * @param {boolean} autoUrlRedirection
 * @param {string} tokenSendingStrategy
 * @param {string} swaggerVersion
 * @param {string} preferredUrl
 * @param {string} swaggerVersionGlobal
 * @param {string} redirectStrategy
 * @return {REST:RESTHost} restHost
 * @return {string} errorCode
 */
var params  = {};
params.defaultContentType = defaultContentType;
params.preferredAcceptHeader = preferredAcceptHeader;

var swaggerRestHost = null;

if(swaggerVersionGlobal == "OpenAPI 3.x") {
    swaggerRestHost = RESTHostManager.createRESTHostFromOpenApiSpecString(name, swaggerSpecString, preferredUrl, params);
} else if(swaggerVersionGlobal == "Swagger 2.x") {
    swaggerRestHost = RESTHostManager.createRESTHostFromSwaggerSpecString(name, swaggerSpecString, host, basePath, preferredCommunicationProtocol, params);
}

if(!redirectStrategy){
	autoUrlRedirection ? swaggerRestHost.setRedirectStrategy("alwaysRedirect") : swaggerRestHost.setRedirectStrategy("defaultRedirect");
}else{
	swaggerRestHost.setRedirectStrategy(redirectStrategy);
}

swaggerRestHost.connectionTimeout = connectionTimeout;
swaggerRestHost.operationTimeout = operationTimeout;
swaggerRestHost.hostVerification = hostVerification;
swaggerRestHost.proxyHost = proxyHost;
swaggerRestHost.proxyPort = proxyPort;

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
swaggerRestHost.authentication = authenticationObject;


var proxyAuthParams = [proxySessionMode , proxyAuthUserName, proxyAuthPassword];
var proxyAuthenticationObject = RESTAuthenticationManager.createAuthentication(proxyAuthentication, proxyAuthParams);
swaggerRestHost.proxyAuthentication = proxyAuthenticationObject;

if (key != null) {
    System.debug("Will use the following private key id: " + key.id);
    swaggerRestHost.privateKeyId = key.id;
}

restHost = RESTHostManager.addHost(swaggerRestHost);

