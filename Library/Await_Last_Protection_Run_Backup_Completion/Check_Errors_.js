/**
 * Check Errors?
 *
 * @param {CS:ProtectionRun} protectionRun
 * @param {string} errorCode
 * @return {string} error - [object Object]
 */
if (protectionRun.backupRun && protectionRun.backupRun.error) {
	errorCode = protectionRun.backupRun.error;
	error = errorCode;
}