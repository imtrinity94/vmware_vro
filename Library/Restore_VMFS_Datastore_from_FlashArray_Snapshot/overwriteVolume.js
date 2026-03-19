/**
 * Overwrites this volume with another volume or snapshot given in input parameter as source
 *
 * @param {PS:Volume} volumeObject - [object Object]
 * @param {string} source - [object Object]
 * @param {string} snapshotName
 * @return {PS:Volume} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.volume").overwriteVolume(volumeObject,source) ;