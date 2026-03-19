/**
 * Export Certname
 *
 * @param {string} sshUsername
 * @param {SecureString} sshPassword
 * @param {string} sshKeyPath
 * @param {SecureString} sshPassphrase
 * @param {string} nodeHostname
 * @param {boolean} useSudo
 * @return {string} nodeCertname
 */
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
} else {
    path = "";
    pass = sshPassword;
    isNormalPassword = true;
}

System.log("Retrieving Certname for this Node.");
try {
    session = new SSHSession(nodeHostname, sshUsername);
    session.connectWithPasswordOrIdentity(isNormalPassword, pass, path);

    session.executeCommand((useSudo ? "sudo " : "") + "/opt/puppetlabs/bin/puppet config print certname", true);

    if (session.exitCode !== 0) {
    	error = System.getModule("com.puppet.o11n.plugin.puppet.node").getSectionText("ERROR", session.output);
    	if (!error) {
        	error = "Failed to get certname. exitCode=" + session.exitCode;
    	}
    	throw error;
    } else {
		nodeCertname = session.output;
	}
} catch(e) {
    System.error("Error retrieving certname for " + nodeHostname + ": " + e);
} finally {
    if (session) {
    	try {
        	session.disconnect();
	  	}
	  	catch(e) {
	    	System.error("Error disconnecting SSH session to " + nodeHostname + ": " + e);
      	}
    }
	System.log("CertName is: " + nodeCertname);
}	