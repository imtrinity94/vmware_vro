/**
 * Eradicates volume
 *
 * @param {string} volumeName - [object Object]
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.volume").eradicateVolumeByName(volumeName,flashArrayConnection) ;