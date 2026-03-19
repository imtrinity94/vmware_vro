/**
 * Queries specific exported Virtual Volume from the selected HPE 3PAR StoreServ array.
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:Volume} virtualVolume
 * @param {number} lunID
 * @param {StoreServ:Host} host
 * @param {string} storeservPort
 * @return {Array/Properties} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.export").getSpecificExportedVirtualVolume(connection,virtualVolume,lunID,host,storeservPort) ;