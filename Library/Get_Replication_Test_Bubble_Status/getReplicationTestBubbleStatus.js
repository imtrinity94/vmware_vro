/**
 * Returns a string indicating whether the replication has a test bubble or not.
 *
 * @param {VR:VcToVcSourceGroup} replication
 * @param {string} userName
 * @param {SecureString} password
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vr.replicationDetails").getReplicationTestBubbleStatus(replication,userName,password) ;