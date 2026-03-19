/**
 * Run Puppet
 *
 * @param {number} puppetRunExitCode
 * @param {PowerShell:PowerShellHost} host
 * @param {string} nodeHostname
 * @return {number} puppetRunExitCode
 */
var session;
try {
    session = host.openSession();

    System.log("Shutting down service");

    var result = session.invokeScript("cmd /c \"puppet resource service puppet ensure=stopped\"; return $LASTEXITCODE");

    // Check for errors 
    var results = result.getResults();

    System.log("Doing Puppet run");
    
    result = session.invokeScript("cmd /c \"puppet agent --test --color=false --detailed-exitcodes 2>&1 \"; return $LASTEXITCODE");

    if (result.getInvocationState().toString() === "Completed") {
        // Now parse the JSON to get a return code.
        if (result.getResults()) {
            puppetRunExitCode = JSON.parse(result.getResults().getAsJson())['Objs']['Obj']['LST']['I32'];    
        } else {    
           // Double check that exit code of 0 doesn't actually get returned
            puppetRunExitCode = 0;
        }

        System.log("Puppet run exited with code: " + puppetRunExitCode);
    } else {
        System.log("There was an error attempting to perform an agent run");
        result.getErrors().forEach(System.log);
	}
} catch(e) {
    System.log("Error attempting to run puppet: " + e);

    // If any error happens during the SSH session, log it and set an exit code of -1 to enforce restarting the retry loop.
    puppetRunExitCode = -1;

} finally {
    if (session) {
        host.closeSession(session.getSessionId());
    }
}

