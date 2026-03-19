/**
 * Add a REST host
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
 * @param {string} url
 * @param {string} sessionMode
 * @param {string} oauth2Token
 * @param {string} domain
 * @param {string} workstation
 * @param {string} proxyHost
 * @param {number} proxyPort
 * @param {boolean} hostVerification
 * @param {Configurator:Key} key
 * @param {string} proxyAuthentication
 * @param {string} proxyAuthUserName
 * @param {SecureString} proxyAuthPassword
 * @param {string} proxySessionMode
 * @param {boolean} autoUrlRedirection
 * @param {boolean} parallelRequestExecution
 * @param {string} tokenSendingStrategy
 * @param {string} redirectStrategy
 * @return {REST:RESTHost} restHost
 * @return {string} errorCode
 */
var currentdate = new Date();
var datetime =  + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds() + "."
                + currentdate.getMilliseconds();
System.log(" *** Add a REST host START: ");
System.log(datetime);
System.log(" *** Add a REST host End  ");

if (parallelRequestExecution) {
   var host = RESTHostManager.createHostSupportingParallelRequests(name);
} else {
   var host = RESTHostManager.createHost(name);
}

host.url = url;
host.connectionTimeout = connectionTimeout;
host.operationTimeout = operationTimeout;
host.hostVerification = hostVerification;
host.proxyHost = proxyHost;
host.proxyPort = proxyPort;

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

var proxyAuthParams = [proxySessionMode , proxyAuthUserName, proxyAuthPassword];
var proxyAuthenticationObject = RESTAuthenticationManager.createAuthentication(proxyAuthentication, proxyAuthParams);
host.proxyAuthentication = proxyAuthenticationObject;

if (key != null) {
    System.debug("Will use the following private key id: " + key.id);
    host.privateKeyId = key.id;
}

restHost = RESTHostManager.addHost(host);
System.log("REST host added: " + restHost.url);