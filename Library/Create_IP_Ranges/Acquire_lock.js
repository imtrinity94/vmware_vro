/**
 * Acquire lock
 *
 * @param {string} attrCreateIPRanges - [object Object]
 * @param {string} attrOwner - [object Object]
 */
System.log("Trying to lock '" + attrCreateIPRanges + "' for owner: '" + attrOwner + "'" );
LockingSystem.lockAndWait(attrCreateIPRanges, attrOwner);
System.log("Locked id: '" + attrCreateIPRanges + "' for owner: '" + attrOwner + "'");