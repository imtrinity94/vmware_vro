/**
 * Initialize EAs
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {string} attrResourceIdEaName
 * @param {string} attrNicIndexEaName
 * @param {string} attrOnDemandTagName
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrResourceIdEaDef
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrNicIndexEaDef
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrOnDemandTagDef
 */
System.log("Initializing extensible attributes...");
attrResourceIdEaDef = ipamConnection.getExtensibleAttributeDefinition(attrResourceIdEaName);
attrNicIndexEaDef = ipamConnection.getExtensibleAttributeDefinition(attrNicIndexEaName);
attrOnDemandTagDef = ipamConnection.getExtensibleAttributeDefinition(attrOnDemandTagName);