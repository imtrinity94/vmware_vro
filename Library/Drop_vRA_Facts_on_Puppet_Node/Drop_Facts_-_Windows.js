/**
 * Drop Facts - Windows
 *
 * @param {PowerShell:PowerShellHost} host
 * @param {string} nodeHostname - [object Object]
 * @param {string} factsJSON - [object Object]
 * @param {string} command
 * @return {boolean} failed
 * @return {string} errorCode
 */
if (command) {
	System.log("Dropping vRA Puppet facts on " + nodeHostname);

	var session;
	try {
	
		session = host.openSession();
	
	    System.debug("Attempting to execute command: " + command);
	
	    var result = session.invokeScript(command);
	    System.debug('result.getInvocationState().toString() is ' + result.getInvocationState().toString());
	
	    if (result.getInvocationState().toString() === 'Failed') {
	    	throw "Failed to execute command. errors=" + result.getErrors();
	    } else {
	    	var output = result.getHostOutput();
	        System.debug("Command execution output: " + output);
	
	        if (!output) {
	        	throw "Output of session.invokeScript() is empty";
	        }
	        else { //normal execution
	        	failed = false;
	        }
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
	        	host.closeSession(session.getSessionId());
	        }
	        catch(e) {
	        	System.error("Caught error while closing session: " + e);
	            //we won't make this a hard error so we'll leave 'failed' as it is.
	        }
		}
	}
}