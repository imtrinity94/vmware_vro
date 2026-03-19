/**
 * Queries specific Virtual Volume by WWN form seleted HPE 3PAR StoreServ array.
 *
 * @param {StoreServ:Connection} connection - [object Object]
 * @param {string} virtualVolumeWWN - [object Object]
 * @return {StoreServ:Volume} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.volume").getVolumeByWWN(connection,virtualVolumeWWN) ;