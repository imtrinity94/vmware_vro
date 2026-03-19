/**
 * createAbrGroup
 *
 * @param {SRM:ProtectionFolder} protectionFolder
 * @param {string} name
 * @param {string} description
 * @param {Array/SRM:UnassignedReplicatedDatastore} datastores
 * @return {SRM:ProtectionGroup} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.srm.group").createAbrGroup(protectionFolder,name,description,datastores) ;