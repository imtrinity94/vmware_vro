/**
 * returns: Base64 encoded SHA-384 based Hashed Message Authentication Code (HMAC)
 *
 * @param {string} keyB64 - [object Object]
 * @param {string} dataB64 - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.o11n.plugin.crypto.digest").hmacSha384(keyB64,dataB64) ;