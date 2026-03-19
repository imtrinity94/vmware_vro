/**
 * Execute SSH Command
 *
 * @param {string} username
 * @param {SecureString} password
 * @param {string} cmd
 * @param {boolean} passwordAuthentication
 * @param {Path} path
 * @param {string} hostName
 * @param {SecureString} passphrase
 * @param {Path} defaultKeyPairPath
 * @param {string} encoding
 * @param {number} port - [object Object]
 * @return {string} output
 * @return {string} error
 * @return {string} exitCode
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

	System.log("Executing Command using encoding '" + (encoding ? encoding : "Default System Encoding") + "'");
	session.setEncoding(encoding);
	session.executeCommand(cmd, true);

	output = session.getOutput();
	error = session.getError();
	exitCode = session.exitCode;

	System.log("Output: Completed.");


} catch (e) {
	throw "Unable to execute command: " + e;
} finally {
	if (session) {
		session.disconnect();
	}
}
