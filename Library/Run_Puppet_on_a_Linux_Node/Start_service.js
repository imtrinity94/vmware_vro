/**
 * Start service
 *
 * @param {string} nodeHostname
 * @param {string} sshUsername
 * @param {SecureString} sshPassword
 * @param {boolean} useSudo
 * @param {string} sshKeyPath
 * @param {SecureString} sshPassphrase
 */
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

    var disable = (useSudo ? "sudo " : "") + "/opt/puppetlabs/bin/puppet agent --disable 'vRO is restarting service but we do not want a puppet run to occur'";
    var start   = (useSudo ? "sudo " : "") + "/opt/puppetlabs/bin/puppet resource service puppet ensure=running";
    var sleep   = "sleep 5";
    var enable  = (useSudo ? "sudo " : "") + "/opt/puppetlabs/bin/puppet agent --enable";
    var command = disable + ";" + start + ";" + sleep + ";" + enable;

    System.log("Executing command: " + command);

    session.executeCommand(command, true);

    System.debug("Service start result. exitCode=" + session.exitCode + " output=" + session.output + " error=" + session.error);

    if (session.exitCode != 0) {
        System.log("Failed to restart the puppet service");
    } else {
        System.log("Puppet service restarted");
    }

}
finally {
    if (session) {
        try {
            session.disconnect();
        }
        catch(e) {
            System.error("Error disconnecting SSH session to " + nodeHostname + ": " + e);
            throw new Error(e);
        }
    }
}
