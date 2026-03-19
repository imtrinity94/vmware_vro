/**
 * returns: Base64 encoded MD5 based Hashed Message Authentication Code (HMAC)
 *
 * @param {string} keyB64 - [object Object]
 * @param {string} dataB64 - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.o11n.plugin.crypto.digest").hmacMd5(keyB64,dataB64) ;