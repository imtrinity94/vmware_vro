/**
 * Returns a Base64 encoded 512 bit SHA-512 hash from Base64 encoded data. Compatible with non-string data.
 *
 * @param {string} dataB64 - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.o11n.plugin.crypto.digest").sha512Base64(dataB64) ;