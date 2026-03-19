/**
 * Check for error
 *
 * @param {string} error
 * @return {string} errorMessage
 * @return {number} cmdResult
 */
if(error.equals("")){
	cmdResult = 0;
} else {
	cmdResult =-1;
	errorMessage = "SSHSCPGetFile: " + error;
	System.error("Failed to get file. Error: " + error);
}