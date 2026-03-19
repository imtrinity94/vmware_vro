/**
 * Assign
 *
 * @param {string} output
 * @param {string} error
 * @param {string} exitCode - [object Object]
 * @return {number} result
 * @return {string} outputText
 * @return {string} errorText
 */
outputText = output;
errorText = error;
if(exitCode == "0"){
	result = 1;
} else {
	result = -1;
	throw "SSH execute command failed. Reason: " + error;
}
