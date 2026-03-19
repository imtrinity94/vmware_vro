/**
 * Retry
 *
 * @param {string} errorCode
 * @param {number} retry_customization - [object Object]
 * @return {number} retry_customization - [object Object]
 */
System.error(errorCode);
if (retry_customization <= 0) {
	throw errorCode;
}
retry_customization = retry_customization - 1;