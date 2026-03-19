/**
 * Returns the replication's recovery solution or an error message if there is one thrown by HMS
 *
 * @param {VR:VcToVcSourceGroup} replication
 * @param {string} userName
 * @param {SecureString} password
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vr.replicationDetails").getReplicationRecoverySolution(replication,userName,password) ;