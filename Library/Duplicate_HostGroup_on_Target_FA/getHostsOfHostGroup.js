/**
 * Returns the Hosts of  Host Group.
 *
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @param {PS:HostGroup} hostGroup - [object Object]
 * @return {Array/PS:Host} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.hostgroup").getHostsOfHostGroup(flashArrayConnection,hostGroup) ;