/**
 * restoreSnapshottoBaseVolume
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:Snapshot} snapVolName
 * @param {number} snapPriorityValue
 * @return {StoreServ:Task} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.snapshot").restoreSnapshottoBaseVolume(connection,snapVolName,snapPriorityValue) ;