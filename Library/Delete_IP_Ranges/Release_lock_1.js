/**
 * Release lock
 *
 * @param {string} attrDeleteIPRanges - [object Object]
 * @param {string} attrOwner - [object Object]
 */
LockingSystem.unlock(attrDeleteIPRanges, attrOwner);
System.log("Unlocked id: '" + attrDeleteIPRanges + "' for owner: '" + attrOwner + "'");