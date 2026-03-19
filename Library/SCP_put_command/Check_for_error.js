/**
 * Check for error
 *
 * @param {string} error
 * @param {string} errorMessage
 * @return {number} cmdResult
 * @return {string} errorMessage
 */
if(error.equals("")){
	cmdResult = 0;
} else {
	cmdResult =-1;
	errorMessage = "SSHSCPPutFile: " + error;
	System.error("Failed to put file. Error: " + error);
}
