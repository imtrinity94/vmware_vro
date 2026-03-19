/**
 * Gets a host record by name in specified DNS view.
If DNS view is not specified, then default DNS view will be used.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} hostName - [object Object]
 * @param {string} dnsView - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.infoblox.ipam").getHostByName(ipamConnection,hostName,dnsView) ;