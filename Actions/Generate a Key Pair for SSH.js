/**
 * @description Generates an SSH DSA key pair and stores it at the specified path on the vRO server.
 *              Logs the resulting fingerprint on success, or logs an error on failure.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

try {
    var strFingerPrint = KeyPairManager.generateKeyPair("dsa", "../server/vmo/conf/vco_key_for_ssh", "P@ssw0rd1!", 2048, "");

    Server.log(strFingerPrint);
} catch (e) {
    Server.error("Failed to generate key pair", e);
}
