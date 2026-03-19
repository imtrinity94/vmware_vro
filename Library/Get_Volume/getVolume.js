/**
 * Returns details of given volume
 *
 * @param {string} volumeName - [object Object]
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @return {PS:Volume} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.volume").getVolume(volumeName,flashArrayConnection) ;