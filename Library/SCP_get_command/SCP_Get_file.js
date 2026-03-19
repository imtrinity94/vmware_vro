/**
 * Get a single file from a host and put it into a local directory
 *
 * @param {string} host - [object Object]
 * @param {string} username - [object Object]
 * @param {SecureString} password - [object Object]
 * @param {Path} remoteFile - [object Object]
 * @param {Path} localFile - [object Object]
 * @param {number} port - [object Object]
 * @return {string} error - [object Object]
 */

var sshCmd = new SSHCommand(host,username,password,port);
var error;
try {
	sshCmd.getFile(remoteFile,localFile);
	error = sshCmd.getError();
} finally {
	sshCmd.disconnect();
}
