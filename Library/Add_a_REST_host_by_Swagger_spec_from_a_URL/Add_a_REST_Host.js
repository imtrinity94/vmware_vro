/**
 * Add a REST Host
 *
 * @param {string} accessToken
 * @param {SecureString} accessTokenSecret
 * @param {string} authentication
 * @param {SecureString} authPassword
 * @param {string} authUserName
 * @param {number} connectionTimeout
 * @param {string} consumerKey
 * @param {SecureString} consumerSecret
 * @param {string} name
 * @param {number} operationTimeout
 * @param {string} sessionMode
 * @param {string} oauth2Token
 * @param {string} domain
 * @param {string} workstation
 * @param {boolean} hostVerification
 * @param {Configurator:Key} key
 * @param {string} defaultContentType
 * @param {string} schemaResourceUserBasicAuthUsername
 * @param {SecureString} schemaResourceUserBasicAuthPassword
 * @param {string} swaggerSpecUrl
 * @param {string} preferredCommunicationProtocol
 * @param {string} preferredAcceptHeader
 * @param {boolean} autoUrlRedirection
 * @param {string} tokenSendingStrategy
 * @param {string} swaggerVersion
 * @param {string} preferredUrl
 * @param {string} redirectStrategy - [object Object]
 * @return {REST:RESTHost} restHost
 * @return {string} errorCode
 */
var params  = {};
params.defaultContentType = defaultContentType;
params.preferredAcceptHeader = preferredAcceptHeader;

params.resolve = true ;

var host = null;

if(!swaggerVersion) {
	swaggerVersion = "Swagger 2.x"
}

if(swaggerVersion == "OpenAPI 3.x") {
    host = RESTHostManager.createRESTHostFromOpenApiUrl(name, swaggerSpecUrl, getApiKeyValues(), preferredUrl, params);
} else if(swaggerVersion == "Swagger 2.x") {
    host = RESTHostManager.createRESTHostFromSwaggerSpecUrl(name, swaggerSpecUrl, getApiKeyValues(), preferredCommunicationProtocol, params);
}

host.connectionTimeout = connectionTimeout;
host.operationTimeout = operationTimeout;
host.hostVerification = hostVerification;

if(!redirectStrategy){
	autoUrlRedirection ? host.setRedirectStrategy("alwaysRedirect") : host.setRedirectStrategy("defaultRedirect");
}else{
	host.setRedirectStrategy(redirectStrategy);
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
host.authentication = authenticationObject;


if (key != null) {
    System.debug("Will use the following private key id: " + key.id);
    host.privateKeyId = key.id;
}

restHost = RESTHostManager.addHost(host);


function getApiKeyValues() {
   var apiKeyArray = [];
   if (schemaResourceUserBasicAuthUsername  && schemaResourceUserBasicAuthPassword) {
       var e = "Basic " + HTTPBasicAuthentication.getBasicAuthHeaderValue(schemaResourceUserBasicAuthUsername, schemaResourceUserBasicAuthPassword);
       var basicAuthentication =  new AuthorizationValue("Authorization", HTTPBasicAuthentication.getBasicAuthHeaderValue(schemaResourceUserBasicAuthUsername, schemaResourceUserBasicAuthPassword),"header");
       apiKeyArray.push(basicAuthentication);
   }
   return apiKeyArray;
}