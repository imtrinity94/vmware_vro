/**
 * Creates volume by copying existing volume
 *
 * @param {string} name - [object Object]
 * @param {string} source - [object Object]
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @return {PS:Volume} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.volume").createVolumeByCopySource(name,source,flashArrayConnection) ;