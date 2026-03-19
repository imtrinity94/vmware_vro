/**
 * Init On-Demand EA
 *
 * @param {InfobloxIPAM:IpamConnection} attrIpamConnection
 * @param {string} attrOnDemandTagName
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrOnDemandTagDef
 */
attrOnDemandTagDef = attrIpamConnection.getExtensibleAttributeDefinition(attrOnDemandTagName);