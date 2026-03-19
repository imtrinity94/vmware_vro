/**
 * Initialize EAs
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {string} resourceId
 * @param {number} vnicIndex
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa1Definition
 * @return {string} attrSearchEa1Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa2Definition
 * @return {string} attrSearchEa2Value
 */
attrSearchEa1Definition = ipamConnection.getExtensibleAttributeDefinition("VMware resource ID");
attrSearchEa1Value = resourceId;