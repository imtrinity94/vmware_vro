/**
 * Adds an IPAM IPv4 or IPv6 network to NIOS
 *
 * @param {number} cidr - [object Object]
 * @param {string} comment - [object Object]
 * @param {string} dhcpOptionDomainName
 * @param {Array/string} dhcpOptionDomainNameServers
 * @param {Array/string} dhcpOptionDomainSearch
 * @param {Array/string} dhcpOptionNetbiosNameServers
 * @param {Array/string} dhcpOptionRouters
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea10Definition
 * @param {string} ea10Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea1Definition
 * @param {string} ea1Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea2Definition
 * @param {string} ea2Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea3Definition
 * @param {string} ea3Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea4Definition
 * @param {string} ea4Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea5Definition
 * @param {string} ea5Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea6Definition
 * @param {string} ea6Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea7Definition
 * @param {string} ea7Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea8Definition
 * @param {string} ea8Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea9Definition
 * @param {string} ea9Value - [object Object]
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {Array/string} members - [object Object]
 * @param {InfobloxIPAM:IpamMemberType} membersType - [object Object]
 * @param {string} netaddr - [object Object]
 * @param {string} networkView - [object Object]
 * @param {string} template - [object Object]
 * @param {boolean} restartIfNeeded
 */
//Auto generated script, cannot be modified !
System.getModule("com.infoblox.ipam").addNetwork(ipamConnection,netaddr,cidr,networkView,template,members,membersType,comment,dhcpOptionDomainName,dhcpOptionDomainSearch,dhcpOptionDomainNameServers,dhcpOptionRouters,dhcpOptionNetbiosNameServers,ea1Definition,ea1Value,ea2Definition,ea2Value,ea3Definition,ea3Value,ea4Definition,ea4Value,ea5Definition,ea5Value,ea6Definition,ea6Value,ea7Definition,ea7Value,ea8Definition,ea8Value,ea9Definition,ea9Value,ea10Definition,ea10Value,restartIfNeeded) ;