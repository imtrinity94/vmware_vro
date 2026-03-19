/**
 * Get FlashArray host group.
 *
 * @param {string} hostGroupName - [object Object]
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @return {PS:HostGroup} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.hostgroup").getSpecificFlashArrayHostGroup(hostGroupName,flashArrayConnection) ;