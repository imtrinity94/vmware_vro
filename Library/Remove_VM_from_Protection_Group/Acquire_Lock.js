/**
 * Acquire Lock
 *
 * @param {CS:ProtectionJob} protectionJob - [object Object]
 * @param {string} lockManager
 */
System.log("Waiting on the objects lockid = "+protectionJob.displayName+", owner = "+lockManager);
// Acquire lock on the protection Job
LockingSystem.lockAndWait(protectionJob.displayName, lockManager);