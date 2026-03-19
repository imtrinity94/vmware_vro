/**
 * Log the input text to the console and the server log with level 'warn'
 *
 * @param {string} attrRollbackErrorMessage
 */
var text = "Error removing on-demand IP ranges: " + attrRollbackErrorMessage
System.warn(text);
Server.warn(text);
