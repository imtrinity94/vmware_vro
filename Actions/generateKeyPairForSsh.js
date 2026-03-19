/**
 * @description Generates an SSH DSA key pair and stores it at the specified path on the vRO server.
 *              Logs the resulting fingerprint on success, or logs an error on failure.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @returns {void}
 */

var keyPairPath = "../server/vmo/conf/vco_key_for_ssh";
var keyPassphrase = "P@ssw0rd1!";
var keyBits = 2048;

try {
    var keyFingerprint = KeyPairManager.generateKeyPair("dsa", keyPairPath, keyPassphrase, keyBits, "");
    System.log("Successfully generated SSH key pair. Fingerprint: " + keyFingerprint);
} catch (e) {
    System.error("Failed to generate SSH key pair at " + keyPairPath + ". Error: " + e);
}

return null;
