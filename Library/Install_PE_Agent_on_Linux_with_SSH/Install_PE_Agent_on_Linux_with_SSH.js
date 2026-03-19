/**
 * Install PE Agent on Linux with SSH
 *
 * @param {Puppet:Master} puppetMaster - [object Object]
 * @param {string} puppetCodeEnvironment - [object Object]
 * @param {string} puppetNodeCertname - [object Object]
 * @param {SecureString} puppetAutosignSharedSecret - [object Object]
 * @param {string} nodeHostname - [object Object]
 * @param {string} sshUsername - [object Object]
 * @param {SecureString} sshPassword - [object Object]
 * @param {string} puppetRoleClass
 * @param {string} uuid
 * @param {string} puppetApptier - [object Object]
 * @param {string} puppetDepartment - [object Object]
 * @param {string} puppetService - [object Object]
 * @param {boolean} useSudo
 * @param {string} sshKeyPath
 * @param {SecureString} sshPassphrase
 * @param {string} errorCode
 * @param {string} installMaster
 * @return {string} errorCode
 * @return {boolean} failed
 */
System.log("Installing Puppet Enterprise agent on " + nodeHostname);

    var session;
    var path;
    var pass;
    var isNormalPassword;
    if(sshKeyPath) {
      path = sshKeyPath;
      if (sshPassphrase) {
        pass = sshPassphrase;
        isNormalPassword = false;
      }
      else {
        pass = "";
        isNormalPassword = false;
      }
    }
    else {
      path = "";
      pass = sshPassword;
      isNormalPassword = true;
    }

    try {
        session = new SSHSession(nodeHostname, sshUsername);
        session.connectWithPasswordOrIdentity(isNormalPassword, pass, path);

    var installSource = installMaster ? installMaster : puppetMaster.host
    var command = "bash -c set -o pipefail && " +
                  (useSudo ? "sudo " : "") + "curl -k https://" + installSource + ":8140/packages/current/install.bash | " +
                  (useSudo ? "sudo " : "");

    var options = PuppetWorkflowUtils.bashAgentInstallArgs(puppetCodeEnvironment, puppetNodeCertname, puppetAutosignSharedSecret, puppetRoleClass, uuid, puppetApptier, puppetDepartment, puppetService);

    command += options;
    command += " --puppet-service-ensure stopped";

    System.log("Executing command: " + command);

    session.executeCommand(command, true);

    System.debug("Install Puppet Enterprise agent result. exitCode=" + session.exitCode + " output=" + session.output + " error=" + session.error);
    if (session.exitCode !== 0) {
        var error = System.getModule("com.puppet.o11n.plugin.puppet.node").getSectionText("ERROR", session.output);
        if (!error) {
            error = "Failed to install agent. exitCode=" + session.exitCode;
        }

        throw error;
    }
}
catch(e) {
  errorCode += "\n" + "Error installing agent on " + nodeHostname + ": " + e;
  failed = true;
  System.error(errorCode);
}
finally {
    if (session) {
        try {
            session.disconnect();
        }
        catch(e) {
            System.error("Error disconnecting SSH session to " + nodeHostname + ": " + e);
        }
    }
}
