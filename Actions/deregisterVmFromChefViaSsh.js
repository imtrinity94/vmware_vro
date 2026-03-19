/**
 * @description Removes a virtual machine from a Chef server during decommissioning by executing
 *              `knife node delete` and `knife client delete` commands via SSH.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {string[]} hostnamesList - Array of hostnames to remove from Chef.
 * @returns {void}
 */

var chefServerV10 = "chef-v10.vcoflow.co.uk";
var chefServerV11 = "chef-v11.vcoflow.co.uk";
var sshPrivateKeyPath = "../server/vmo/conf/vco_key";

System.log("Initiating Chef cleanup for " + hostnamesList.length + " host(s) via SSH.");

try {
    var chefSshSession = new SSHSession(chefServerV10, "vcoflow");
    chefSshSession.connectWithIdentity(sshPrivateKeyPath, "");

    var i;
    for (i = 0; i < hostnamesList.length; i++) {
        var hostNameStr = hostnamesList[i];
        var fqdnStr = hostNameStr.toLowerCase() + ".vcoflow.co.uk";

        System.log("--- Processing Node: " + fqdnStr + " ---");

        // Execute Knife Node Delete
        var nodeDeleteCmd = "knife node delete " + fqdnStr + " -y -c /home/vcoflow/client.rb -u vcoflow -k /home/vcoflow/client.pem";
        System.log("Executing SSH Command: " + nodeDeleteCmd);
        chefSshSession.executeCommand(nodeDeleteCmd, true);

        var nodeOutput = chefSshSession.getOutput();
        var nodeError = chefSshSession.getError();
        var nodeExitCode = chefSshSession.exitCode;

        if (nodeExitCode === 0) {
            System.log("Node deletion success. Output: " + nodeOutput.replace(/[\r\n]/g, ""));
        } else {
            if (nodeError.indexOf("404 \"Not Found\"") !== -1) {
                System.warn("Chef node '" + fqdnStr + "' not found. Skipping deletion.");
            } else {
                System.error("Knife node delete failed: " + nodeError);
            }
        }

        // Execute Knife Client Delete
        var clientDeleteCmd = "knife client delete " + fqdnStr + " -y -c /home/vcoflow/client.rb -u vcoflow -k /home/vcoflow/client.pem";
        System.log("Executing SSH Command: " + clientDeleteCmd);
        chefSshSession.executeCommand(clientDeleteCmd, true);

        var clientOutput = chefSshSession.getOutput();
        var clientError = chefSshSession.getError();
        var clientExitCode = chefSshSession.exitCode;

        if (clientExitCode === 0) {
            System.log("Client deletion success. Output: " + clientOutput.replace(/[\r\n]/g, ""));
        } else {
            if (clientError.indexOf("404 \"Not Found\"") !== -1) {
                System.warn("Chef client '" + fqdnStr + "' not found. Skipping deletion.");
            } else {
                System.error("Knife client delete failed: " + clientError);
            }
        }
    }

    chefSshSession.disconnect();
    chefSshSession = null;
    System.log("Chef decommissioning cleanup completed.");

} catch (sshException) {
    System.error("Chef SSH connection or execution failed: " + sshException);
    System.error("Crucial: The virtual machine(s) might still exist as stale records in the Chef server.");
}

return null;
