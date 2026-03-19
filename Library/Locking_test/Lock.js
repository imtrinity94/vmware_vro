/**
 * Lock
 *
 * @param {string} lockId
 * @param {string} owner
 */
System.log( "Try to lock with lockId:'" + lockId + "' for owner:'" + owner + "'" );
LockingSystem.lockAndWait( lockId, owner );
System.log( "Locked id:'" + lockId + "' for owner:'" + owner + "'");
