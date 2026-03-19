/**
 * Gets IPv4 or IPv6 network from IPAM.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} networkViewName - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.infoblox.ipam").getNetworkView(ipamConnection,networkViewName) ;