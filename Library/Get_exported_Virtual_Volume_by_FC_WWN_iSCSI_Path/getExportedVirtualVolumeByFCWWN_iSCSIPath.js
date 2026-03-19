/**
 * Queries exported Virtual Volume by FC WWN/iSCSI name from the selected HPE 3PAR StoreServ array.
 *
 * @param {StoreServ:Connection} connection
 * @param {string} remoteName
 * @return {Array/Properties} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.export").getExportedVirtualVolumeByFCWWN_iSCSIPath(connection,remoteName) ;