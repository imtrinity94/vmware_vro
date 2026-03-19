/**
 * Updates fixed address or reservation in IPAM with given values.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} fixedAddressRef - [object Object]
 * @param {string} newName - [object Object]
 * @param {string} newMac - [object Object]
 * @param {boolean} restartIfNeeded - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.infoblox.ipam").updateFixedAddress(ipamConnection,fixedAddressRef,newName,newMac,restartIfNeeded) ;