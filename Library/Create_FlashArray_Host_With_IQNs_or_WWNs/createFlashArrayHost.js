/**
 * Create Host with name as mandatory parameter and rest other as optional input parameters.
 *
 * @param {string} hostName - [object Object]
 * @param {Array/string} wwnList - [object Object]
 * @param {Array/string} iqnList - [object Object]
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @return {PS:Host} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.host").createFlashArrayHost(hostName,wwnList,iqnList,flashArrayConnection) ;