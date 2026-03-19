/**
 * Generate KeyPair
 *
 * @param {Path} path
 * @param {string} type
 * @param {SecureString} passphrase
 * @param {number} size
 * @param {string} comment
 * @return {string} fingerPrint - [object Object]
 * @return {number} result
 * @return {string} errorText
 */

if (!path) {
    throw "Private key path is missing!";
}
if (!type) {
    type = 'rsa';
    System.log("Setting default key type: " + type);
}
if (!size) {
  if (type == 'rsa') {
      size = 2048;
  } else if (type == 'dsa') {
      size = 2048;
  } else if (type == "ecdsa") {
      size = 521;
  } else {
      throw "Unsupported algorithm exception. Possible values are 'rsa', 'dsa' or 'ecdsa'";
  }
  System.log("Setting default key size: " + size);
}

try {
	fingerPrint = KeyPairManager.generateKeyPair(type, path, passphrase, size, comment);
	result = 0;
} catch (e) {
	errorText = "Failed to generate key pair: " + e;
	Server.error("Failed to generate key pair", e);
	result = -1;
	throw "Failed to generate key pair: " + e;
}