/**
 * 3DES (EDE) Decryption. Returns original data Base64 encoded.
 *
 * @param {string} encryptedB64 - [object Object]
 * @param {string} secretB64 - [object Object]
 * @param {string} ivB64 - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.o11n.plugin.crypto.encryption").tripleDesDecrypt(encryptedB64,secretB64,ivB64) ;