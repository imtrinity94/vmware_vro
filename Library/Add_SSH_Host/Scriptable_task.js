/**
 * Scriptable task
 *
 * @param {string} hostname - [object Object]
 * @param {number} port - [object Object]
 * @param {string} username - [object Object]
 * @param {boolean} passwordAuthentication - [object Object]
 * @param {SecureString} password - [object Object]
 * @param {SecureString} passphrase - [object Object]
 * @param {string} certificatePath - [object Object]
 * @param {Array/string} rootFolders - [object Object]
 * @return {SSH:Host} sshHost - [object Object]
 */
var mySSHHostConfiguration = new SSHHostConfiguration() ;
mySSHHostConfiguration.hostname = hostname;
mySSHHostConfiguration.port = port;
mySSHHostConfiguration.username = username;
mySSHHostConfiguration.rootFolders = rootFolders;
mySSHHostConfiguration.passwordAuthentication = passwordAuthentication;

if(passwordAuthentication){
	mySSHHostConfiguration.password = password;
} else {
	mySSHHostConfiguration.passphrase = passphrase;
	mySSHHostConfiguration.certificatePath = certificatePath;
}

sshHost = SSHHostManager.addSshHost(mySSHHostConfiguration);