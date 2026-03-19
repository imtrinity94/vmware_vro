/**
 * Invoke script
 *
 * @param {PowerShell:PowerShellHost} host
 * @param {string} externalScript
 * @param {string} arguments
 * @return {PowerShell:PowerShellRemotePSObject} output
 */
var output;
var session;
try {
	session = host.openSession();
	var script =  '& "' + externalScript + '" ' + arguments;
	output = System.getModule("com.vmware.library.powershell").invokeScript(host,script,session.getSessionId()) ;
} finally {
	if (session){
		host.closeSession(session.getSessionId());
	}
}