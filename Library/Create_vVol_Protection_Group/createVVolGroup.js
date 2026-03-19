/**
 * createVVolGroup
 *
 * @param {SRM:ProtectionFolder} protectionFolder
 * @param {string} name
 * @param {string} description
 * @param {Array/SRM:ReplicationGroup} replicationGroups
 * @return {SRM:ProtectionGroup} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.srm.group").createVVolGroup(protectionFolder,name,description,replicationGroups) ;