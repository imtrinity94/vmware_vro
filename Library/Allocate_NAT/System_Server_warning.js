/**
 * Log the input text to the console and the server log with level 'warn'
 *
 * @param {string} attrErrorMessage
 * @param {string} attrCurrentIpRange
 */
var text = "An error has occurred while allocating IP addresses in " + attrCurrentIpRange + ":\n"
	+ attrErrorMessage;
System.warn(text);
Server.warn(text);
