/**
 * Queries exported Virtual Volume by Host from the selected HPE 3PAR StoreServ array.
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:Host} host
 * @return {Array/Properties} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.export").getExportedVirtualVolumeByHost(connection,host) ;