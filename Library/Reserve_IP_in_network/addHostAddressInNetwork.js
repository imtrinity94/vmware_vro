/**
 * Adds a host address to the existing host record using next available IP address from the specified network.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} hostName - [object Object]
 * @param {string} dnsView - [object Object]
 * @param {string} netaddr - [object Object]
 * @param {number} cidr - [object Object]
 * @param {string} networkView - [object Object]
 * @param {string} macAddress - [object Object]
 * @param {boolean} enableDhcp - [object Object]
 * @param {boolean} restartIfNeeded - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.infoblox.ipam").addHostAddressInNetwork(ipamConnection,hostName,dnsView,netaddr,cidr,networkView,macAddress,enableDhcp,restartIfNeeded) ;