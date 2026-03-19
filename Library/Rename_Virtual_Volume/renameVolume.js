/**
 * renameVolume
 *
 * @param {StoreServ:Connection} connection
 * @param {StoreServ:Volume} volumeName
 * @param {string} newVolumeName
 * @return {StoreServ:Volume} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.hpe.storeserv.volume").renameVolume(connection,volumeName,newVolumeName) ;