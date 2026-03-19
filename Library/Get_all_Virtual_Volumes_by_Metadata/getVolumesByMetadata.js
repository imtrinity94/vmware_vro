/**
 * Retrieves all Virtual Volumes by metadata from the selected HPE 3PAR StoreServ array.
 *
 * @param {StoreServ:Connection} connection
 * @param {string} key
 * @param {string} value
 * @return {Array/StoreServ:Volume} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.metadata").getVolumesByMetadata(connection,key,value) ;