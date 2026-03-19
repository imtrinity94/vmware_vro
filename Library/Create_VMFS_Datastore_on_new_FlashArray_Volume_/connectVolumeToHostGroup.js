/**
 * connectVolumeToHostGroup
 *
 * @param {PS:Volume} volumeObj - [object Object]
 * @param {PS:HostGroup} hostGroupObj - [object Object]
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @return {boolean} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.hostgroup").connectVolumeToHostGroup(volumeObj,hostGroupObj,flashArrayConnection) ;