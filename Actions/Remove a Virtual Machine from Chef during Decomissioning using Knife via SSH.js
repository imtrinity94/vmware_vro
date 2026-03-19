/**
 * @description Removes a virtual machine from a Chef server during decommissioning by executing
 *              `knife node delete` and `knife client delete` commands via SSH.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {string[]} arrHostNames - Array of hostnames to remove from Chef.
 * @returns {void}
 */

var strChef10 = "chef-v10.vcoflow.co.uk";

var strChef11 = "chef-v11.vcoflow.co.uk";

try {
    var objSSHSession = new SSHSession(strChef10, "vcoflow");
    objSSHSession.connectWithIdentity("../server/vmo/conf/vco_key", "");

    for (var i = 0; i < arrHostNames.length; i++) {
        var strHostName = arrHostNames[i];

        objSSHSession.executeCommand("knife node delete " + strHostName.toLowerCase() + ".vcoflow.co.uk -y -c /home/vcoflow/client.rb -u vcoflow -k /home/vcoflow/client.pem", true);

        System.log("===== SSH Executing: knife node delete '" + strHostName.toLowerCase() + ".vcoflow.co.uk'");

        var strOutputText = objSSHSession.getOutput();
        strOutputText = strOutputText.replace(/\n/, "");

        var strErrorText = objSSHSession.getError();

        var intExitCode = objSSHSession.exitCode;

        if (intExitCode == 0) {
            System.log("===== SSH Output: " + strOutputText);
        } else {
            if (strErrorText.search(/404 \"Not Found\"/) > -1) {
                System.warn("===== SSH Error: Node " + strHostName.toLowerCase() + ".vcoflow.co.uk not found on Chef Server");
            } else {
                System.error(strErrorText);
            }
        }

        objSSHSession.executeCommand("knife client delete " + strHostName.toLowerCase() + ".vcoflow.co.uk-y -c /home/vcoflow/client.rb -u vcoflow -k /home/vcoflow/client.pem", true);

        System.log("===== SSH Executing: knife client delete '" + strHostName.toLowerCase() + ".vcoflow.co.uk'");

        var strOutputText = objSSHSession.getOutput();

        var strErrorText = objSSHSession.getError();

        var intExitCode = objSSHSession.exitCode;

        if (intExitCode == 0) {
            System.log("===== SSH Output: " + strOutputText);
        } else {
            if (strErrorText.search(/404 \"Not Found\"/) > -1) {
                System.warn("===== SSH Error: Client " + strHostName.toLowerCase() + ".vcoflow.co.uk not found on Chef Server");
            } else {
                System.error(strErrorText);
            }
        }
    }

    objSSHSession.disconnect();
    objSSHSession = null;
} catch (strException) {
    System.error("===== Exception: " + strException);
    System.error("===== Unable to SSH to " + strChef9 + " to run the 'knife' commands to clean up Chef");
}
