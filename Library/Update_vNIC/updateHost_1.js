/**
 * Updates host record in IPAM with given values.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} hostRef - [object Object]
 * @param {string} newHostName - [object Object]
 * @param {Array/string} newAliases - [object Object]
 * @param {boolean} updateHostAddress - [object Object]
 * @param {string} oldIp - [object Object]
 * @param {string} newIp - [object Object]
 * @param {string} newMac - [object Object]
 * @param {boolean} newEnableDhcp - [object Object]
 * @param {boolean} restartIfNeeded - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.infoblox.ipam").updateHost(ipamConnection,hostRef,newHostName,newAliases,updateHostAddress,oldIp,newIp,newMac,newEnableDhcp,restartIfNeeded) ;