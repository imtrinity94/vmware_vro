/**
 * Removes DHCP range from IPAM.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} networkView - [object Object]
 * @param {string} endAddress
 * @param {string} startAddress
 */
//Auto generated script, cannot be modified !
System.getModule("com.infoblox.ipam").removeRange(ipamConnection,startAddress,endAddress,networkView) ;