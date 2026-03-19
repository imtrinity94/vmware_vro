/**
 * Deletes a network in NIOS with all of its associated information
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} netaddr - [object Object]
 * @param {number} cidr - [object Object]
 * @param {string} networkView - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.infoblox.ipam").removeNetwork(ipamConnection,networkView,netaddr,cidr) ;