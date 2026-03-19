/**
 * Release Lock
 *
 * @param {CS:ProtectionJob} protectionJob - [object Object]
 * @param {string} lockManager
 * @param {string} errorCode
 */
System.log("Unlocking on the objects lockid = "+protectionJob.displayName+", owner = "+lockManager);
// Release the lock on the protection job resource.
LockingSystem.unlock(protectionJob.displayName, lockManager);
// Throw any error generated before.
if(errorCode != null && errorCode != '') {
	throw errorCode;
}