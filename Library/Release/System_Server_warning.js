/**
 * Log the input text to the console and the server log with level 'warn'
 *
 * @param {string} attrErrorMessage
 * @param {string} attrRequestId - [object Object]
 */
var text = "Cannot handle release request [" + attrRequestId + "]: " + attrErrorMessage;
System.warn(text);
Server.warn(text);