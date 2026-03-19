/**
 * Log the input text to the console and the server log with level 'warn'
 *
 * @param {string} attrErrorMessage
 */
var text = "Error creating IP Ranges: " + attrErrorMessage;
System.warn(text);
Server.warn(text);
