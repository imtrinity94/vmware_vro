/**
 * Change passphrase
 *
 * @param {Path} path
 * @param {SecureString} oldPassphrase
 * @param {SecureString} newPassphrase
 * @return {number} result
 * @return {string} errorText
 */
try {
	KeyPairManager.changePassphrase(path,oldPassphrase,newPassphrase);
	System.log("Passphrase changed successfully");
	result = 0;
} catch (e){
	errorText = "Failed to change passphrase: "+e;
	Server.error("Failed to change passphrase", e);
	result = -1;
	throw "Failed to change passphrase: " + e;
}