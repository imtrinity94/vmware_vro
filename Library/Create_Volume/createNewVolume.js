/**
 * Creates new volume
 *
 * @param {string} name - [object Object]
 * @param {string} size - [object Object]
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @return {PS:Volume} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.volume").createNewVolume(name,size,flashArrayConnection) ;