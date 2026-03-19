/**
 * Changes the name of existing volume
 *
 * @param {PS:Volume} volumeObject - [object Object]
 * @param {string} newVolumeName - [object Object]
 * @return {PS:Volume} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.volume").renameVolume(volumeObject,newVolumeName) ;