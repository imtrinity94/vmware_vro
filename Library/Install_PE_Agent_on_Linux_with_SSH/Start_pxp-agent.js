/**
 * Start pxp-agent
 *
 * @param {string} nodeHostname
 * @param {boolean} useSudo
 * @param {string} errorCode
 * @param {boolean} failed
 * @param {string} sshUsername
 * @param {SecureString} sshPassword
 * @param {string} sshKeyPath
 * @param {SecureString} sshPassphrase
 * @param {number} sshExitCode
 * @return {string} errorCode
 * @return {boolean} failed
 */
System.log("Starting pxp-agent on " + nodeHostname);

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

    var command = (useSudo ? "sudo " : "") + "/opt/puppetlabs/bin/puppet agent --test --color=false --detailed-exitcodes --tags puppet_enterprise::pxp_agent;";

    System.log("Executing command: " + command);

    session.executeCommand(command, true);

    System.debug("Puppet agent run result. exitCode=" + session.exitCode + " output=" + session.output + session.error ? " error=" + session.error : "");

	if (session.exitCode == 0) {
    	errorCode = session.exitCode;
		failed = false;
	}
	else {
		errorCode = session.exitCode;
		failed = true;
	}
}
catch(e) {
    // If any error happens during the SSH session, log it and set an exit code of -1 to enforce restarting the retry loop.
    System.error("There was an error maintaining an SSH connection to the system.");
    errorCode = -1;
	failed = true;
}
finally {
    System.log("Puppet run exited with code " + errorCode);
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
