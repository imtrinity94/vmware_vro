/**
 * Extracts the prepended IV that was prepended on an encrypted string
 *
 * @param {string} encryptedB64
 * @return {string} encryptedAttr
 * @return {string} ivAttr
 */

var inputLength = CryptoEncoding.getLengthBase64(encryptedB64);

//IV for AES is 16 bytes
ivAttr = CryptoEncoding.getSubsetBase64(encryptedB64, 0, 16);
encryptedAttr = CryptoEncoding.getSubsetBase64(encryptedB64, 16, inputLength - 16);