/**
 * @description Removes a virtual machine's SSL certificate from all configured Puppet masters
 *              during decommissioning by sending a DELETE request to the Puppet REST API.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {string[]} arrHostNames - Array of hostnames to remove from Puppet.
 * @param {number} i - Index into arrHostNames for the current VM to decommission.
 * @returns {void}
 */

// The following script removes a virtual machine from Puppet during decommissioning using the Puppet REST API

var arrPuppetMasters = new Array();
arrPuppetMasters.push("puppet-master-01");
arrPuppetMasters.push("puppet-master-02");

var strHostName = arrHostNames[i].toLowerCase();

for (var ii = 0; ii < arrPuppetMasters.length; ii++) {
    var strPuppetMaster = arrPuppetMasters[ii];

    System.log("===== Attempting to DELETE the SSL Certificate for '" + strHostName + "' from " + strPuppetMaster);

    try {
        var objURL = new URL("https://" + strPuppetMaster + ":8140/production/certificate_status/" + strHostName);
        objURL.requestType = "DELETE";

        var strContent = objURL.getContent();
        strContent = strContent.replace(/\n/, "");

        System.log("===== Result: " + strContent);
    } catch (objException) {
        System.error("===== Failed to DELETE the SSL Certificate for '" + strHostName + ".vcoflow.co.uk' from " + strPuppetMaster);
    }
}
