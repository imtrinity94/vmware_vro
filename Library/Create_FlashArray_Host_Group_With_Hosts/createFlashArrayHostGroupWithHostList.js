/**
 * Creates flasharray host group with specified list of hosts.
 *
 * @param {PS:FlashArrayConnection} flashArrayConnection - [object Object]
 * @param {string} hostGroupName - [object Object]
 * @param {Array/PS:Host} hostList - [object Object]
 * @return {PS:HostGroup} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.purestorage.flasharray.hostgroup").createFlashArrayHostGroupWithHostList(flashArrayConnection,hostGroupName,hostList) ;