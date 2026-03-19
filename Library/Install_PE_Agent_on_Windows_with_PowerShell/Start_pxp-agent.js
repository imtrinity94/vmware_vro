/**
 * Start pxp-agent
 *
 * @param {PowerShell:PowerShellHost} host
 * @param {string} nodeHostname
 * @param {string} errorCode
 * @param {boolean} failed
 * @param {string} sshUsername
 * @param {SecureString} sshPassphrase
 * @param {SecureString} sshPassword
 * @param {string} sshKeyPath
 * @param {boolean} useSudo
 * @return {string} errorCode
 * @return {boolean} failed
 */
var session;
try {
    session = host.openSession();

    System.log("Starting pxp-agent");
    
    result = session.invokeScript("cmd /c \"puppet agent --test --color=false --detailed-exitcodes --tags puppet_enterprise::pxp_agent 2>&1\"; return $LASTEXITCODE");

    if (result.getInvocationState().toString() === "Completed") {
        // Now parse the JSON to get a return code.
        if (result.getResults()) {
            errorCode = JSON.parse(result.getResults().getAsJson())['Objs']['Obj']['LST']['I32'];

			if(errorCode == 0) {
				failed = false;
			} else {
				failed = true;
			}
        } else {    
           // Double check that exit code of 0 doesn't actually get returned
            errorCode = 0;
			failed = false;
        }

        System.log("Puppet run exited with code: " + errorCode);
    } else {
        System.log("There was an error attempting to perform an agent run");
        result.getErrors().forEach(System.log);
		failed = true;
	}
} catch(e) {
    System.log("Error attempting to run puppet: " + e);

    // If any error happens during the SSH session, log it and set an exit code of -1 to enforce restarting the retry loop.
    errorCode = -1;
	failed = true;

} finally {
    if (session) {
        host.closeSession(session.getSessionId());
    }
}

