/**
 * Queries the Host details based on the iSCSI name from a selected HPE 3PAR Storeserv array.
 *
 * @param {StoreServ:Connection} connection
 * @param {string} name
 * @return {StoreServ:Host} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.host").queryHostByiSCSIName(connection,name) ;