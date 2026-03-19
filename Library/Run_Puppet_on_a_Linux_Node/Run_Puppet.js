/**
 * Run Puppet
 *
 * @param {number} puppetRunExitCode
 * @param {string} nodeHostname
 * @param {string} sshUsername
 * @param {SecureString} sshPassword
 * @param {boolean} useSudo
 * @param {string} sshKeyPath
 * @param {SecureString} sshPassphrase
 * @return {number} puppetRunExitCode
 */
System.log("Running Puppet on " + nodeHostname);

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

    var command = (useSudo ? "sudo " : "") + "/opt/puppetlabs/bin/puppet resource service puppet ensure=stopped;" +
                  (useSudo ? "sudo " : "") + "/opt/puppetlabs/bin/puppet agent --test --color=false --detailed-exitcodes;";

    System.log("Executing command: " + command);

    session.executeCommand(command, true);

    System.debug("Puppet agent run result. exitCode=" + session.exitCode + " output=" + session.output + session.error ? " error=" + session.error : "");

    puppetRunExitCode = session.exitCode;
}
catch(e) {
    // If any error happens during the SSH session, log it and set an exit code of -1 to enforce restarting the retry loop.
    System.error("There was an error maintaining an SSH connection to the system.");
    puppetRunExitCode = -1;
}
finally {
    System.log("Puppet run exited with code " + puppetRunExitCode);
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
