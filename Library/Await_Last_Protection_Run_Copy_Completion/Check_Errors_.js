/**
 * Check Errors?
 *
 * @param {CS:ProtectionRun} protectionRun
 * @param {string} errorCode
 * @return {string} error - [object Object]
 */
// Iterate all copy run targets
protectionRun.copyRun.forEach(function (copyRun) {
	if (copyRun.error) {
		error = copyRun.error;
	}
});