/**
 * Validate
 *
 * @param {string} vsanConnection
 * @param {string} username
 * @param {SecureString} password
 */
System.log(password)
System.log(vsanConnection)
VsanServerInstanceManager.validateConnectionByUrl(vsanConnection, username, password);

System.log("Connection validated successfully");