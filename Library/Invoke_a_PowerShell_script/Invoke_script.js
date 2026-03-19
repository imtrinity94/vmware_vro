/**
 * Invoke script
 *
 * @param {PowerShell:PowerShellHost} host
 * @param {string} script
 * @param {string} sessionId
 * @return {PowerShell:PowerShellRemotePSObject} output
 */
var output;
var session;
try {
	session = host.openSession();
	output = System.getModule("com.vmware.library.powershell").invokeScript(host,script,session.getSessionId()) ;
} finally {
	if (session){
		host.closeSession(session.getSessionId());
	}
}