/**
 * Delete CSR Files
 *
 * @param {string} sshUsername
 * @param {SecureString} sshPassword
 * @param {string} sshKeyPath
 * @param {SecureString} sshPassphrase
 * @param {string} nodeHostname
 * @param {boolean} removeCSRFiles
 * @param {boolean} useSudo
 */
if (removeCSRFiles) {
  var error;
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

  // delete csr_attributes.yaml and CSR pem
  System.debug("Deleting csr_attributes.yaml and CSR pem file");
  try {
    session = new SSHSession(nodeHostname, sshUsername);
    session.connectWithPasswordOrIdentity(isNormalPassword, pass, path);

    session.executeCommand((useSudo ? "sudo " : "") + "rm /etc/puppetlabs/puppet/csr_attributes.yaml; " +
                           (useSudo ? "sudo " : "") + "rm -f /etc/puppetlabs/puppet/ssl/certificate_requests/*", true);

    if (session.exitCode !== 0) {
      error = System.getModule("com.puppet.o11n.plugin.puppet.node").getSectionText("ERROR", session.output);
      if (!error) {
        error = "Failed to delete csr_attributes.yaml or CSR pem file. exitCode=" + session.exitCode;
      }
      throw error;
    }
  }
  catch(e) {
    System.error("Error deleting CSR files on " + nodeHostname + ": " + e);
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
}	