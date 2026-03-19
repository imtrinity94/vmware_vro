/**
 * Modifies metadata for the Virtual Volume in the selected HPE 3PAR StoreServ array.
 *
 * @param {StoreServ:Connection} connection - [object Object]
 * @param {StoreServ:Volume} volume - [object Object]
 * @param {string} key - [object Object]
 * @param {string} value - [object Object]
 * @return {boolean} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.metadata").modifyVolumeMetadata(connection,volume,key,value) ;