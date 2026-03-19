/**
 * Gets IPv4 or IPv6 range from IPAM.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} startAddress - [object Object]
 * @param {string} endAddress - [object Object]
 * @param {string} networkView - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.infoblox.ipam").getRange(ipamConnection,startAddress,endAddress,networkView) ;