/**
 * Asymmetric RSA encryption. Result is Base64 encoded.
 *
 * @param {string} key - [object Object]
 * @param {string} dataB64 - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.o11n.plugin.crypto.rsa").encrypt(key,dataB64) ;