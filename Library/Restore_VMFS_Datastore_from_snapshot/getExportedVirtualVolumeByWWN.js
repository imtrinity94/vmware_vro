/**
 * Queries exported Virtual Volume by WWN from the selected HPE 3PAR StoreServ array.
 *
 * @param {StoreServ:Connection} connection
 * @param {string} volumeWWN
 * @return {Array/Properties} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.export").getExportedVirtualVolumeByWWN(connection,volumeWWN) ;