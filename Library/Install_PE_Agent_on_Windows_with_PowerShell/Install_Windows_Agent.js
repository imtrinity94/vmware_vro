/**
 * Install Windows Agent
 *
 * @param {Puppet:Master} puppetMaster - [object Object]
 * @param {PowerShell:PowerShellHost} host
 * @param {string} puppetCodeEnvironment - [object Object]
 * @param {string} puppetNodeCertname - [object Object]
 * @param {SecureString} puppetAutosignSharedSecret - [object Object]
 * @param {string} nodeHostname - [object Object]
 * @param {string} username - [object Object]
 * @param {SecureString} password - [object Object]
 * @param {string} name
 * @param {string} puppetRoleClass - [object Object]
 * @param {string} errorCode
 * @param {string} uuid
 * @param {string} puppetApptier - [object Object]
 * @param {string} puppetDepartment - [object Object]
 * @param {string} puppetService - [object Object]
 * @param {string} puppetAgentAccountUser
 * @param {SecureString} puppetAgentAccountPassword
 * @param {string} puppetAgentAccountDomain
 * @param {string} param1
 * @param {string} installMaster
 * @return {string} errorCode
 * @return {boolean} failed
 */
System.log("Installing Puppet Enterprise agent on " + nodeHostname);

var session;
try {
    session = host.openSession();

    var installSource = installMaster || puppetMaster.host

    var command = "[Net.ServicePointManager]::ServerCertificateValidationCallback = {$true} \n" +
                  "[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]768 \n" +
                  "[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]3072 \n" +
                  "$webClient = New-Object System.Net.WebClient \n" +
                  "$webClient.DownloadFile('https://" + installSource + ":8140/packages/current/install.ps1', 'c:/install.ps1') \n" +
                  '& c:/install.ps1 ';

    var options = PuppetWorkflowUtils.psAgentInstallArgs(puppetCodeEnvironment, puppetNodeCertname, puppetAutosignSharedSecret, puppetRoleClass, uuid, puppetApptier, puppetDepartment, puppetService);

    if (puppetAgentAccountUser) { command += ' -PuppetAgentAccountUser ' + "'" + puppetAgentAccountUser + "'"; }
    if (puppetAgentAccountPassword) { command += ' -PuppetAgentAccountPassword ' + "'" + puppetAgentAccountPassword + "'"; }
    if (puppetAgentAccountDomain) { command += ' -PuppetAgentAccountDomain ' + "'" + puppetAgentAccountDomain + "'"; }
    command += ' -PuppetServiceEnsure stopped'
    command += ' ' + options;
    command += ' 2>&1 \n';

    System.log("Attempting to execute command: " + command);

    var result = session.invokeScript(command);
    System.log('result.getInvocationState().toString() is ' + result.getInvocationState().toString());

    var output = result.getHostOutput();
    
    if (result.getInvocationState().toString() === 'Failed') {
        throw "Failed to execute command. errors=" + System.getModule("com.puppet.o11n.plugin.puppet.node").getSectionText("ERROR", output);
    } else {

        if (!output.trim()) {
           throw "Output of session.invokeScript() is empty";
           failed = true;
        }
        else { //normal execution
           failed = false;
        }
    }

    System.log("Command execution output: " + output);
}
catch (e) {
    errorCode += "\n" + "Caught error while running install: " + e + ".";
    System.error(errorCode);
    failed = true;
}
finally {
    if (session) {
        try {
            host.closeSession(session.getSessionId());
        }
        catch(e) {
            System.error("Caught error while closing session: " + e);
            //we won't make this a hard error so we'll leave 'failed' as it is.
        }
    }
}