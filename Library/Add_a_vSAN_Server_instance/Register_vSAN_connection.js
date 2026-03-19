/**
 * Register vSAN connection
 *
 * @param {string} host
 * @param {number} port
 * @param {string} username
 * @param {SecureString} password
 * @return {string} newInstanceUrl
 */
var connection = VsanServerInstanceManager.registerVsanConnection(host, port, username, password);
System.log("The vSAN server instance registered successfully: " + connection);
newInstanceUrl = connection;