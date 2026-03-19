/**
 * createOnlineVolumePhysicalCopy
 *
 * @param {StoreServ:Connection} connection - [object Object]
 * @param {StoreServ:Volume} virtualVolume - [object Object]
 * @param {string} copyVolumeName - [object Object]
 * @param {StoreServ:CPG} destCPG - [object Object]
 * @param {string} provisionType - [object Object]
 * @param {StoreServ:CPG} snapCPG - [object Object]
 * @param {boolean} compression - [object Object]
 * @return {StoreServ:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.clones").createOnlineVolumePhysicalCopy(connection,virtualVolume,copyVolumeName,destCPG,provisionType,snapCPG,compression) ;