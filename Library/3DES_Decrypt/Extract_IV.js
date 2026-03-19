/**
 * Extracts the prepended IV that was prepended on an encrypted string
 *
 * @param {string} encryptedB64
 * @return {string} encryptedAttr
 * @return {string} ivAttr
 */
var inputLength = CryptoEncoding.getLengthBase64(encryptedB64);

//IV for 3DES is 8 bytes
ivAttr = CryptoEncoding.getSubsetBase64(encryptedB64, 0, 8);
encryptedAttr = CryptoEncoding.getSubsetBase64(encryptedB64, 8, inputLength - 8);