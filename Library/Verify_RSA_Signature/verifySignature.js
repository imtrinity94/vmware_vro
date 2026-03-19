/**
 * Verifies a RSA signature. Returns true on successful validation.
 *
 * @param {string} key - [object Object]
 * @param {string} dataB64 - [object Object]
 * @param {string} signatureB64 - [object Object]
 * @return {boolean} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.o11n.plugin.crypto.rsa").verifySignature(key,dataB64,signatureB64) ;