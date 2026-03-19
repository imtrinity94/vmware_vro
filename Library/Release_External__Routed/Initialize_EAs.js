/**
 * Initialize EAs
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {string} resourceId
 * @param {string} attripaddress
 * @param {number} vnicIndex
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa1Definition
 * @return {string} attrSearchEa1Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa2Definition
 * @return {string} attrSearchEa2Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrSearchEa3Definition
 * @return {string} attrSearchEa3Value
 */
attrSearchEa1Definition = ipamConnection.getExtensibleAttributeDefinition("VMware resource ID");
attrSearchEa1Value = resourceId;