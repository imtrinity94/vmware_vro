/**
 * Start service
 *
 * @param {PowerShell:PowerShellHost} host
 */
var session;
try {
    session = host.openSession();
    var disable = "cmd /c \"puppet agent --disable 'vRO is restarting service but we do not want a puppet run to occur'\"";
    var start   = "cmd /c \"puppet resource service puppet ensure=running\"";
    var sleep   = "sleep 5";
    var enable  = "cmd /c \"puppet agent --enable\"";    
    var command = disable + ";" + start + ";" + sleep + ";" + enable;

    System.log("Executing command: " + command);

    var result  = session.invokeScript(command);

    if (result.getInvocationState().toString() === "Failed") {
        System.log("Failed to restart the puppet service");
    } else {
        System.log("Puppet service restarted");
    }
}
catch (e) {
    System.log("Error tring to start service: " + e);
}  finally {
    if (session) {
        host.closeSession(session.getSessionId());
    }
}

