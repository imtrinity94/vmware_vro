/**
 * Log the input text to the console log with level 'error'
 *
 * @param {string} errorCode
 * @param {CS:ProtectionJob} newProtectionJob - [object Object]
 */
System.error(errorCode);
System.error("Unable to add VM to the new protection job '" + newProtectionJob.displayName + "'. Reverting changes...");