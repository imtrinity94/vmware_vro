/**
 * Adds a host address to the existing host record.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} hostName - [object Object]
 * @param {string} dnsView - [object Object]
 * @param {string} ipAddress - [object Object]
 * @param {string} macAddress - [object Object]
 * @param {boolean} enableDhcp - [object Object]
 * @param {boolean} restartIfNeeded - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.infoblox.ipam").addHostAddress(ipamConnection,hostName,dnsView,ipAddress,macAddress,enableDhcp,restartIfNeeded) ;