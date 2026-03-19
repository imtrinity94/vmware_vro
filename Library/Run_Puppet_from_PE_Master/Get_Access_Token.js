/**
 * Get Access Token
 *
 * @param {Puppet:Master} puppetMaster
 * @param {boolean} generateToken
 * @param {SecureString} consolePassword
 * @param {string} consoleUserName
 * @param {string} errorCode
 * @return {string} errorCode
 */
generateToken = (typeof generateToken === typeof true) ? generateToken : true;

if (generateToken) {
	var useSudo = puppetMaster.getUseSudo();
	var user = (consoleUserName) ? consoleUserName : puppetMaster.getUsername();
	var password = (consolePassword) ? consolePassword : puppetMaster.getPassword();

	var rbacCmd = "/usr/bin/cat /etc/puppetlabs/client-tools/services.conf |grep -i rbac |grep url";
	var rbacResult = puppetMaster.executeCommand((useSudo ? "sudo " : "") + rbacCmd);

	if (rbacResult.exitCode !== 0) {
		var error = System.getModule("com.puppet.o11n.plugin.puppet.node").getSectionText("ERROR", rbacResult.output);
	    if (!error) {
	        error = "Failed to retrieve rbac server url from master. exitCode=" + rbacResult.exitCode;
    	}
	    errorCode += "\n" + error;
	    System.error(errorCode);
	    throw errorCode;
	}

  System.log("Retrieving rbac server url.");
  
  var rbacResultOutput = rbacResult.output;
  var rbacServersArrayText = "[{" + rbacResultOutput.trim().replace(/ /g, "").replace(/\n/g, "},{") + "}]";
  var rbacServersArray = JSON.parse(rbacServersArrayText);
  var rbacServer = rbacServersArray[0]["url"] + "/v1/auth/token"

	System.log("Retrieving Puppet cacert path");

	var certCmd = "/usr/local/bin/puppet config print cacert";
	var certResult = puppetMaster.executeCommand((useSudo ? "sudo " : "") + certCmd);
	var certPath = certResult.output.trim();

	if (certResult.exitCode !== 0) {
		var error = System.getModule("com.puppet.o11n.plugin.puppet.node").getSectionText("ERROR", certResult.output);
	    if (!error) {
    	    error = "Failed to retrieve cert path from master. exitCode=" + certResult.exitCode;
	    }
	    errorCode += "\n" + error;
	    System.error(errorCode);
	    throw errorCode;
	}

	System.log("Acquiring Access Token.");
	var prepCmd = puppetMaster.executeCommand("/usr/bin/mkdir ~/.puppetlabs");

	var tokenCmd = "/usr/bin/curl -X POST -H 'Content-Type: application/json' --cacert " + certPath + " " + rbacServer + " -d '{\"login\":\"" + user + "\",\"password\":\"" + password + "\",\"lifetime\":\"30m\"}'";
	var tokenResult = puppetMaster.executeCommand((useSudo ? "sudo " : "") + tokenCmd);
		if (tokenResult.exitCode !== 0) {
    	var error = System.getModule("com.puppet.o11n.plugin.puppet.node").getSectionText("ERROR", tokenResult.output);
	    if (!error) {
	        error = "Failed to acquire token from master. exitCode=" + tokenResult.exitCode;
	    }
	    errorCode += "\n" + error;
	    System.error(errorCode);
	    throw errorCode;
	}
	
	try {
		token = JSON.parse(tokenResult.output).token;
	} catch (e) {
		errorCode += "\nFailed to parse token from output: " + e;
	    System.error(errorCode);
	    throw errorCode;
	} 
	
	var writeTokenCmd = puppetMaster.executeCommand("echo '" + token + "' > ~/.puppetlabs/token");
	if (writeTokenCmd.exitCode !== 0) {
    	var error = System.getModule("com.puppet.o11n.plugin.puppet.node").getSectionText("ERROR", writeTokenCmd.output);
	    if (!error) {
	        error = "Failed to write token to master. exitCode=" + writeTokenCmd.exitCode;
	    }
	    errorCode += "\n" + error;
	    System.error(errorCode);
	    throw errorCode;
	}
}