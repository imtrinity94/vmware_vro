/**
 * 3DES (EDE) Encryption. Returns encrypted data Base64 encoded.
 *
 * @param {string} dataB64 - [object Object]
 * @param {string} secretB64 - [object Object]
 * @param {string} ivB64 - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.o11n.plugin.crypto.encryption").tripleDesEncrypt(dataB64,secretB64,ivB64) ;