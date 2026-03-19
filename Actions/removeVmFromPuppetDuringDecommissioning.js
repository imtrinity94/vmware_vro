/**
 * @description Removes a virtual machine's SSL certificate from all configured Puppet masters
 *              during decommissioning by sending a DELETE request to the Puppet REST API.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {string[]} decommissionTargetHostnamesList - Array of hostnames to remove from Puppet.
 * @param {number} hostnameIndex - Index into the array for the current VM to decommission.
 * @returns {void}
 */

var puppetMastersList = [
    "puppet-master-01",
    "puppet-master-02"
];

var targetHostnameStr = decommissionTargetHostnamesList[hostnameIndex].toLowerCase();
System.log("Initiating Puppet SSL certificate revocation for: " + targetHostnameStr);

var i;
for (i = 0; i < puppetMastersList.length; i++) {
    var puppetMasterHost = puppetMastersList[i];
    var restEndpointUrl = "https://" + puppetMasterHost + ":8140/production/certificate_status/" + targetHostnameStr;

    System.log("Dispatching DELETE request to Puppet Master: " + puppetMasterHost);

    try {
        var puppetRequestUrl = new URL(restEndpointUrl);
        puppetRequestUrl.requestType = "DELETE";

        var apiResponseRaw = puppetRequestUrl.getContent();
        var sanitizedResponse = apiResponseRaw.replace(/[\r\n]/g, "");

        System.log("Result from " + puppetMasterHost + ": " + sanitizedResponse);
    } catch (puppetEx) {
        System.error("Revocation failed on '" + puppetMasterHost + "' for node: " + targetHostnameStr + ". Error: " + puppetEx);
    }
}

return null;
