/**
 * Drop Facts - Linux
 *
 * @param {string} nodeHostname
 * @param {string} factsJSON
 * @param {string} command
 * @param {string} sshKeyPath
 * @param {string} sshUsername
 * @param {SecureString} sshPassphrase
 * @param {SecureString} sshPassword
 * @param {boolean} useSudo
 * @return {string} errorCode
 * @return {boolean} failed
 */

  try{

    System.log("Dropping vRA Puppet Facts on " + nodeHostname);
    System.debug(factsJSON);

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

        session = new SSHSession(nodeHostname, sshUsername);
        session.connectWithPasswordOrIdentity(isNormalPassword, pass, path);

        System.log("Executing command: " + command);

        session.executeCommand(command, true);

        System.debug("Drop vRA Puppet Facts result. exitCode=" + session.exitCode + " output=" + session.output + " error=" + session.error);
        if (session.exitCode !== 0) {
            var error = System.getModule("com.puppet.o11n.plugin.puppet.node").getSectionText("ERROR", session.output);
            if (!error) {
                error = "Failed to drop vRA Puppet Facts. exitCode=" + session.exitCode;
            }

            throw error;
        }
    }
    catch (e) {
        errorCode += "\n" + "Caught error while dropping facts: " + e + ".";
        System.error(errorCode);
        failed = true;
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