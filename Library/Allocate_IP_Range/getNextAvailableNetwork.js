/**
 * Add a note to the workflow schema.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} netaddr
 * @param {number} cidr
 * @param {string} networkView
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} eaName - [object Object]
 * @param {string} eaValue - [object Object]
 * @param {string} comment - [object Object]
 * @param {string} tenantID - [object Object]
 * @param {boolean} cloudAPI - [object Object]
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.infoblox.ipam").getNextAvailableNetwork(ipamConnection,netaddr,cidr,networkView,eaName,eaValue,comment,tenantID,cloudAPI);
