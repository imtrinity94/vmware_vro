/**
 * Check inputs
 *
 * @param {string} ivB64
 * @return {string} ivAttr
 */
if (ivB64 == null || ivB64.length == 0 || CryptoEncoding.getLengthBase64(ivB64) < 16) {
	ivAttr = CryptoEncryption.generateRandomIv();
} else {
	ivAttr = ivB64;
}