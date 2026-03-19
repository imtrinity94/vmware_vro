/**
 * Initialize Data
 *
 * @param {boolean} assignDhcpOptions
 * @param {boolean} assignMembers
 * @param {string} dhcpOptionDomainName
 * @param {Array/string} dhcpOptionDomainNameServers
 * @param {Array/string} dhcpOptionDomainSearch
 * @param {Array/string} dhcpOptionNetbiosNameServers
 * @param {Array/string} dhcpOptionRouters
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea10Definition
 * @param {string} ea10Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea1Definition
 * @param {string} ea1Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea2Definition
 * @param {string} ea2Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea3Definition
 * @param {string} ea3Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea4Definition
 * @param {string} ea4Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea5Definition
 * @param {string} ea5Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea6Definition
 * @param {string} ea6Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea7Definition
 * @param {string} ea7Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea8Definition
 * @param {string} ea8Value
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea9Definition
 * @param {string} ea9Value
 * @param {number} eaNumber
 * @param {InfobloxIPAM:IpamConnection} ipamConnection
 * @param {Array/string} members
 * @param {InfobloxIPAM:IpamMemberType} membersType
 * @param {string} template
 * @param {boolean} useTemplate
 * @return {string} attrTemplate
 * @return {Array/string} attrMembers
 * @return {InfobloxIPAM:IpamMemberType} attrMembersType
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa1Definition
 * @return {string} attrEa1Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa2Definition
 * @return {string} attrEa2Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa3Definition
 * @return {string} attrEa3Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa4Definition
 * @return {string} attrEa4Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa5Definition
 * @return {string} attrEa5Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa6Definition
 * @return {string} attrEa6Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa7Definition
 * @return {string} attrEa7Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa8Definition
 * @return {string} attrEa8Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa9Definition
 * @return {string} attrEa9Value
 * @return {InfobloxIPAM:IpamExtensibleAttributeDefinition} attrEa10Definition
 * @return {string} attrEa10Value
 * @return {string} attrDhcpOptionDomainName
 * @return {Array/string} attrDhcpOptionDomainSearch
 * @return {Array/string} attrDhcpOptionDomainNameServers
 * @return {Array/string} attrDhcpOptionRouters
 * @return {Array/string} attrDhcpOptionNetbiosNameServers
 * @return {InfobloxIPAM:IpamConnection} attrConnection
 */
attrConnection = ipamConnection;
if (attrConnection) {
	System.log("Infoblox IPAM connection: " + attrConnection.hostName);
} else {
	System.log("Infoblox IPAM connection is not specified");
}

if (!useTemplate && assignDhcpOptions) {
	attrDhcpOptionDomainName = dhcpOptionDomainName;
	attrDhcpOptionDomainSearch = dhcpOptionDomainSearch;
	attrDhcpOptionDomainNameServers = dhcpOptionDomainNameServers;
	attrDhcpOptionRouters = dhcpOptionRouters;
	attrDhcpOptionNetbiosNameServers = dhcpOptionNetbiosNameServers;
}

if (!useTemplate && assignMembers) {
	attrMembers = members;
	attrMembersType = membersType;
}

if (useTemplate) {
	attrTemplate = template;
}

if (eaNumber >= 1) {
	attrEa1Definition = ea1Definition;
	attrEa1Value = ea1Value;
}

if (eaNumber >= 2) {
	attrEa2Definition = ea2Definition;
	attrEa2Value = ea2Value;
}

if (eaNumber >= 3) {
	attrEa3Definition = ea3Definition;
	attrEa3Value = ea3Value;
}

if (eaNumber >= 4) {
	attrEa4Definition = ea4Definition;
	attrEa4Value = ea4Value;
}

if (eaNumber >= 5) {
	attrEa5Definition = ea5Definition;
	attrEa5Value = ea5Value;
}

if (eaNumber >= 6) {
	attrEa6Definition = ea6Definition;
	attrEa6Value = ea6Value;
}

if (eaNumber >= 7) {
	attrEa7Definition = ea7Definition;
	attrEa7Value = ea7Value;
}

if (eaNumber >= 8) {
	attrEa8Definition = ea8Definition;
	attrEa8Value = ea8Value;
}

if (eaNumber >= 9) {
	attrEa9Definition = ea9Definition;
	attrEa9Value = ea9Value;
}

if (eaNumber >= 10) {
	attrEa10Definition = ea10Definition;
	attrEa10Value = ea10Value;
}
