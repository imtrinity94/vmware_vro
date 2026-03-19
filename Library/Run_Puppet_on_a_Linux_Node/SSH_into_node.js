/**
 * SSH into node
 *
 * @param {Date} sshTimer
 * @param {string} nodeHostname
 * @param {string} sshUsername
 * @param {SecureString} sshPassword
 * @param {boolean} useSudo
 * @param {string} sshKeyPath
 * @param {SecureString} sshPassphrase
 * @param {number} waitBetweenAttempts
 * @return {number} sshExitCode
 * @return {Date} sshTimer
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

    // innocuous command to verify a successfull connection
    session.executeCommand("ls", true);

    System.log("SSH attempt result. exitCode=" + session.exitCode + " output=" + session.output + " error=" + session.error);
    sshExitCode = session.exitCode;
}
catch (e) {
    System.error("Could not make initial connection to machine.");
    sshExitCode = -1;
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

    if (sshExitCode != 0) {
        var timeout = new Date();
        timeout.setSeconds(timeout.getSeconds() + waitBetweenAttempts);

        sshTimer = timeout;
    }
}
