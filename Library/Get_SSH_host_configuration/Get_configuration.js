/**
 * Get configuration
 *
 * @param {SSH:Host} sshHost
 * @return {string} hostNameOrIP
 * @return {SecureString} passphrase
 * @return {SecureString} password
 * @return {boolean} passwordAuthentication
 * @return {Path} path
 * @return {number} port
 * @return {string} username
 */
hostNameOrIP = sshHost.sshHostConfiguration.hostname;
port = sshHost.sshHostConfiguration.port;
username = sshHost.sshHostConfiguration.username;
passwordAuthentication = sshHost.sshHostConfiguration.passwordAuthentication;
if (passwordAuthentication) {
    password = decrypt(sshHost.sshHostConfiguration.password);
} else {
    passphrase = decrypt(sshHost.sshHostConfiguration.passphrase);
    path = sshHost.sshHostConfiguration.rootFolders[0];
}


function decrypt(message) {
    var command = new Command("/usr/lib/vco-cli/bin/vro-configure-inner.sh decrypt --value " + message);
    command.execute(true);
    var cmdOutput = command.output;
    if (command.result != 0) {
        throw "Decrypt error: " + cmdOutput;
    }
    var splittedResult = cmdOutput.split("\n");
    return splittedResult[splittedResult.length - 3];
}