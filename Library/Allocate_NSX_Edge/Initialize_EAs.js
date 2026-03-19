/**
 * Initialize EAs
 *
 * @param {string} attrBpRequestIdName - [object Object]
 * @param {string} attrExternalNetworkProfileIdName - [object Object]
 * @param {string} attrExternalRangeIdName - [object Object]
 * @param {InfobloxIPAM:IpamConnection} attrIpamConnection - [object Object]
 * @param {string} attrOnDemandTagName - [object Object]
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrOnDemandTagDef - [object Object]
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrExternalNetworkProfileIdDef - [object Object]
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrExternalRangeIdDef - [object Object]
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrBpRequestIdDef - [object Object]
 */
System.log("Initializing extensible attributes..."); 
attrOnDemandTagDef = attrIpamConnection.getExtensibleAttributeDefinition(attrOnDemandTagName);
attrExternalNetworkProfileIdDef = attrIpamConnection.getExtensibleAttributeDefinition(attrExternalNetworkProfileIdName);
attrExternalRangeIdDef = attrIpamConnection.getExtensibleAttributeDefinition(attrExternalRangeIdName);
attrBpRequestIdDef = attrIpamConnection.getExtensibleAttributeDefinition(attrBpRequestIdName);