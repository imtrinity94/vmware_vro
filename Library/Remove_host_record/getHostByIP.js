/**
 * Gets a host record by IP address in specified network view.
If network view is not specified, then default network view will be used.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} ipAddress - [object Object]
 * @param {string} networkView - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.infoblox.ipam").getHostByIP(ipamConnection,ipAddress,networkView) ;