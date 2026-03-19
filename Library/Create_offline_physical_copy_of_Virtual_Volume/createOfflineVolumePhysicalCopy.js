/**
 * createOfflineVolumePhysicalCopy
 *
 * @param {StoreServ:Connection} connection - [object Object]
 * @param {StoreServ:Volume} virtualVolume - [object Object]
 * @param {StoreServ:Volume} copyVolume - [object Object]
 * @param {boolean} saveSnapshot - [object Object]
 * @param {string} priority - [object Object]
 * @param {boolean} skipzero - [object Object]
 * @return {StoreServ:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.clones").createOfflineVolumePhysicalCopy(connection,virtualVolume,copyVolume,saveSnapshot,priority,skipzero) ;