/**
 * Queries exports of Virtual Volume from the selected HPE 3PAR StoreServ array.
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:Volume} virtualVolume
 * @return {Array/Properties} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.export").getAllExportsOfVirtualVolume(connection,virtualVolume) ;