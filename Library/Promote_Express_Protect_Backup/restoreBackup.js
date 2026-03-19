/**
 * restoreBackup
 *
 * @param {StoreServ:ProtectionConnection} connection
 * @param {StoreServ:ProtectionBackup} backup
 * @param {boolean} restoreToParentVolume
 * @param {boolean} restoreToSnapshot
 * @param {boolean} restoreToAnotherVolume
 * @param {Array/string} volumeNamesList
 * @param {string} storageSystemSerialNumber
 * @return {StoreServ:ProtectionTask} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.rmc.backup").restoreBackup(connection,backup,restoreToParentVolume,restoreToSnapshot,restoreToAnotherVolume,volumeNamesList,storageSystemSerialNumber) ;