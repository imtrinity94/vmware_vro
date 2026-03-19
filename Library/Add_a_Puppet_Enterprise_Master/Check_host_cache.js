/**
 * Check host cache
 *
 * @param {string} host
 * @param {string} errorCode
 * @return {number} matchingHosts
 */
System.log("Attempting to find the host key " + host);
hostExecutor = new PuppetKnownHosts();
matchingHosts = hostExecutor.hostInHostsFile(host);
if(matchingHosts > 0){
	message = "Found " + matchingHosts + " keys matching host " + host;
	System.log(message);
}
else {
	System.log("Host " + host + " is not in the host cache");
}