/**
 * Set errorCode
 *
 * @param {number} puppetRunExitCode
 * @param {number} maxConnectionAttempts
 * @param {string} errorCode
 * @return {string} errorCode
 * @return {boolean} failed
 */
errorCode += "\n" + "The maximum number of attempts to add a PowerShell host has been reached. Max Attemtps: " + maxConnectionAttempts;
failed = true;