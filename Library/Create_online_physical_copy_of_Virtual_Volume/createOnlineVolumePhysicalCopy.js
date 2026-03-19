/**
 * createOnlineVolumePhysicalCopy
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:Volume} virtualVolume
 * @param {string} copyVolumeName
 * @param {StoreServ:CPG} destCPG
 * @param {string} provisionType
 * @param {StoreServ:CPG} snapCPG
 * @param {boolean} compression
 * @return {StoreServ:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.clones").createOnlineVolumePhysicalCopy(connection,virtualVolume,copyVolumeName,destCPG,provisionType,snapCPG,compression) ;