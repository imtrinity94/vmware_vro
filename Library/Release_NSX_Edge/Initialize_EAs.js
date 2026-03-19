/**
 * Initialize EAs
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {string} resourceId
 * @param {number} vnicIndex
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa1Definition
 * @return {string} attrSearchEa1Value
 */
attrSearchEa1Definition = ipamConnection.getExtensibleAttributeDefinition("VMware resource ID");
attrSearchEa1Value = resourceId;
