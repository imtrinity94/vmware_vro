/**
 * createVVSetSnapshot
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:VVSet} vvSetName
 * @param {string} namePattern
 * @param {boolean} accessPermissionValue
 * @param {number} expirationHours
 * @param {number} retentionHours
 * @param {string} snapVVSetName
 * @return {StoreServ:VVSet} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.snapshot").createVVSetSnapshot(connection,vvSetName,namePattern,accessPermissionValue,expirationHours,retentionHours,snapVVSetName) ;