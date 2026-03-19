/**
 * Prepend IV
 *
 * @param {string} encryptedAttr
 * @param {string} ivAttr
 * @return {string} encryptedB64
 * @return {string} ivOutB64
 */
encryptedB64 = CryptoEncoding.binaryConcatBase64(ivAttr, encryptedAttr);
ivOutB64 = ivAttr;