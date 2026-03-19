/**
 * Creates snapshot for the specified Virtual Volume in the selected HPE 3PAR StoreServ array.
 *
 * @param {StoreServ:Connection} connection - [object Object]
 * @param {StoreServ:Volume} virtualVolume - [object Object]
 * @param {string} snapshotName - [object Object]
 * @param {string} snapAccessPermissions - [object Object]
 * @param {number} expirationHours - [object Object]
 * @param {number} retentionHours - [object Object]
 * @param {boolean} accessPermissionValue - [object Object]
 * @return {StoreServ:Snapshot} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.snapshot").createVolumeSnapshot(connection,virtualVolume,snapshotName,snapAccessPermissions,expirationHours,retentionHours,accessPermissionValue) ;