/**
 * Put a single file to a host from a local directory
 *
 * @param {string} host - [object Object]
 * @param {string} username - [object Object]
 * @param {SecureString} password - [object Object]
 * @param {Path} localFile - [object Object]
 * @param {Path} remoteFile - [object Object]
 * @param {number} port - [object Object]
 * @return {string} error - [object Object]
 */

var sshCmd = new SSHCommand(host, username, password, port);
var error;
try {
	sshCmd.putFile(localFile, remoteFile);
	error = sshCmd.getError();
} finally {
	sshCmd.disconnect();
}
