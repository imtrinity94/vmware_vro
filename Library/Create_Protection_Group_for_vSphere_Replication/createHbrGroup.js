/**
 * createHbrGroup
 *
 * @param {SRM:ProtectionFolder} protectionFolder
 * @param {string} name
 * @param {string} description
 * @param {Array/SRM:UnassignedReplicatedVm} vms
 * @return {SRM:ProtectionGroup} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.srm.group").createHbrGroup(protectionFolder,name,description,vms) ;