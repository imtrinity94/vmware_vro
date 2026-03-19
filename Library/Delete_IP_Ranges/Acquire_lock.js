/**
 * Acquire lock
 *
 * @param {string} attrDeleteIPRanges - [object Object]
 * @param {string} attrOwner - [object Object]
 */
System.log("Trying to lock '" + attrDeleteIPRanges + "' for owner: '" + attrOwner + "'" );
LockingSystem.lockAndWait(attrDeleteIPRanges, attrOwner);
System.log("Locked id: '" + attrDeleteIPRanges + "' for owner: '" + attrOwner + "'");