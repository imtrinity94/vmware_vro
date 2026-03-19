/**
 * Adds a host address to the existing host record using next available IP address from the specified network range.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} hostName - [object Object]
 * @param {string} dnsView - [object Object]
 * @param {string} startAddress - [object Object]
 * @param {string} endAddress - [object Object]
 * @param {string} networkView - [object Object]
 * @param {string} macAddress - [object Object]
 * @param {boolean} enableDhcp - [object Object]
 * @param {boolean} restartIfNeeded - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.infoblox.ipam").addHostAddressInRange(ipamConnection,hostName,dnsView,startAddress,endAddress,networkView,macAddress,enableDhcp,restartIfNeeded) ;