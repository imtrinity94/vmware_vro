/**
 * Initialize EAs
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {string} attrOnDemandTagName
 * @param {string} attrRequestIdName
 * @param {string} attrNetProfileIdName
 * @param {string} attrExtNetProfileIdName
 * @param {string} attrBpRequestIdName
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrOnDemandTagDef
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrRequestIdDef
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrNetProfileIdDef
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrExtNetProfileIdDef
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrBpRequestIdDef
 */
System.log("Initializing extensible attributes...");
attrOnDemandTagDef = ipamConnection.getExtensibleAttributeDefinition(attrOnDemandTagName);
attrRequestIdDef = ipamConnection.getExtensibleAttributeDefinition(attrRequestIdName);
attrNetProfileIdDef = ipamConnection.getExtensibleAttributeDefinition(attrNetProfileIdName);
attrExtNetProfileIdDef = ipamConnection.getExtensibleAttributeDefinition(attrExtNetProfileIdName);
attrBpRequestIdDef = ipamConnection.getExtensibleAttributeDefinition(attrBpRequestIdName);
