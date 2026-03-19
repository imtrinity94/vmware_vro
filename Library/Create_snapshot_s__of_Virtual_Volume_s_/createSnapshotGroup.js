/**
 * createSnapshotGroup
 *
 * @param {StoreServ:Connection} connection
 * @param {Array/CompositeType(volName:StoreServ:Volume,snapName:string):VolumeGroup} volsnapNames
 * @param {Array/StoreServ:Volume} volName
 * @param {Array/string} snapName
 * @param {boolean} accessPermissionValue
 * @param {number} expirationHours
 * @param {number} retentionHours
 * @param {string} snapVVSetName
 * @return {boolean} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.snapshot").createSnapshotGroup(connection,volsnapNames,volName,snapName,accessPermissionValue,expirationHours,retentionHours,snapVVSetName) ;