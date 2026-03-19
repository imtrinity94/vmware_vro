/**
 * createVolumeSnapshot
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:Volume} volName
 * @param {string} snapVolName
 * @param {string} snapAccessPermissions
 * @param {number} expirationHours
 * @param {number} retentionHours
 * @param {boolean} accessPermissionValue
 * @return {StoreServ:Snapshot} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.snapshot").createVolumeSnapshot(connection,volName,snapVolName,snapAccessPermissions,expirationHours,retentionHours,accessPermissionValue) ;