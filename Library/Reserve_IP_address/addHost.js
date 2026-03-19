/**
 * Adds a host entry for the VM with specified static IP address. 
Creates host, or adds host address to the existing host record.
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} hostName - [object Object]
 * @param {string} dnsView - [object Object]
 * @param {string} ipAddress - [object Object]
 * @param {string} macAddress - [object Object]
 * @param {boolean} enableDhcp - [object Object]
 * @param {Array/string} aliases - [object Object]
 * @param {string} comment - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea1Definition - [object Object]
 * @param {string} ea1Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea2Definition - [object Object]
 * @param {string} ea2Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea3Definition - [object Object]
 * @param {string} ea3Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea4Definition - [object Object]
 * @param {string} ea4Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea5Definition - [object Object]
 * @param {string} ea5Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea6Definition - [object Object]
 * @param {string} ea6Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea7Definition - [object Object]
 * @param {string} ea7Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea8Definition - [object Object]
 * @param {string} ea8Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea9Definition - [object Object]
 * @param {string} ea9Value - [object Object]
 * @param {InfobloxIPAM:IpamExtensibleAttributeDefinition} ea10Definition - [object Object]
 * @param {string} ea10Value - [object Object]
 * @param {boolean} restartIfNeeded
 * @param {boolean} enableDns
 */
//Auto generated script, cannot be modified !
System.getModule("com.infoblox.ipam").addHost(ipamConnection,hostName,dnsView,ipAddress,macAddress,enableDhcp,enableDns,aliases,comment,ea1Definition,ea1Value,ea2Definition,ea2Value,ea3Definition,ea3Value,ea4Definition,ea4Value,ea5Definition,ea5Value,ea6Definition,ea6Value,ea7Definition,ea7Value,ea8Definition,ea8Value,ea9Definition,ea9Value,ea10Definition,ea10Value,restartIfNeeded) ;