/**
 * Asymmetric RSA decryption. Result is Base64 encoded to support binary data. If you are expecting clear text from the decryption, use CryptoEncoding.base64Decode on the result.
 *
 * @param {string} key - [object Object]
 * @param {string} encryptedB64 - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.o11n.plugin.crypto.rsa").decrypt(key,encryptedB64) ;