/**
 * presentSnapshottoHostSet
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:Snapshot} volumeName
 * @param {number} lun
 * @param {StoreServ:HostSet} hostname
 * @param {boolean} autoLun
 * @param {string} port
 * @return {Properties} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.vluns").presentSnapshottoHostSet(connection,volumeName,lun,hostname,autoLun,port) ;