/**
 * Scriptable task
 *
 * @param {string} hostName
 * @param {number} port
 * @param {string} username
 * @param {SecureString} password
 * @param {Path} localFile
 * @param {Path} remoteFile
 * @param {boolean} passwordAuthentication
 * @param {Path} path
 * @param {SecureString} passphrase
 * @return {string} error
 */
var session = null;
try {
	if (port) {
		session = new SSHSession(hostName, username, port);
	} else {
		System.log("A port value is not provided! Using default port 22");
		session = new SSHSession(hostName, username);
	}

	if (passwordAuthentication){
		System.log("Connecting with password");
	} else {
		if (path == null || path == ""){
			System.log("using default");
			path = defaultKeyPairPath;
		}
		System.log("Connecting with key pair (" + path + ")");
		password = passphrase;
	}

	session.connectWithPasswordOrIdentity(passwordAuthentication, password, path);
	System.log("Connected!");

	session.getFile(remoteFile,localFile);
	output = session.getOutput();
	error = session.getError();
	exitCode = session.exitCode;

	System.log("Output: '" + output + "'");
	System.log("Error: '" + error + "'");
	System.log("Exit code: '" + exitCode + "'");

} catch (e) {
	throw "Unable to execute command: " + e;
} finally {
	if (session) {
		session.disconnect();
	}
}
