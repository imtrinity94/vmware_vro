/**
 * Gets IPv4 or IPv6 network from IPAM.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} networkView - [object Object]
 * @param {string} netaddr - [object Object]
 * @param {number} cidr - [object Object]
 * @return {Any} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.infoblox.ipam").getNetwork(ipamConnection,networkView,netaddr,cidr) ;