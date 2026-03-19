/**
 * Prepend IV
 *
 * @param {string} encryptedAttr
 * @param {string} ivAttr
 * @return {string} encryptedB64
 * @return {string} ivB64Out
 */
encryptedB64 = CryptoEncoding.binaryConcatBase64(ivB64, encryptedAttr);
ivB64Out = ivAttr;