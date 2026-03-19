/**
 * connectVolumeToHostGroup
 *
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @param {PS:HostGroup} hostGroupObj
 * @param {PS:Volume} volumeObj
 * @return {boolean} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.hostgroup").connectVolumeToHostGroup(volumeObj,hostGroupObj,flashArrayConnection) ;