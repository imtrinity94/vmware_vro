/**
 * process error
 *
 * @param {string} errorCode
 * @return {boolean} exists
 */
if (!/File .+ was not found.+/.test(errorCode)) {
	throw errorCode;
}
exists = false;