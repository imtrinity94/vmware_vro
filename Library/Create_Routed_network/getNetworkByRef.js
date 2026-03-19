/**
 * Gets IPv4 or IPv6 network from IPAM by reference.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} networkRef - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.infoblox.ipam").getNetworkByRef(ipamConnection,networkRef) ;