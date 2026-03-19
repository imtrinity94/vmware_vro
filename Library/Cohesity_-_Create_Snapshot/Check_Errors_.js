/**
 * Check Errors?
 *
 * @param {CS:ProtectionRun} protectionRun
 */
if (protectionRun.backupRun.error) {
	throw protectionRun.backupRun.error;
}