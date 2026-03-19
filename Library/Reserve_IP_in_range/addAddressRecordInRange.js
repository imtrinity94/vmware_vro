/**
 * Adds A or AAAA DNS record to IPAM using get next available IP address from specified network range.
Optionally action creates a PTR record (withPtrRecord=true).
 *
 * @param {InfobloxIPAM:IpamConnection} ipamConnection - [object Object]
 * @param {string} name - [object Object]
 * @param {string} dnsView - [object Object]
 * @param {string} startAddress - [object Object]
 * @param {string} endAddress - [object Object]
 * @param {string} networkView - [object Object]
 * @param {boolean} withPtrRecord - [object Object]
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
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.infoblox.ipam").addAddressRecordInRange(ipamConnection,name,dnsView,startAddress,endAddress,networkView,withPtrRecord,comment,ea1Definition,ea1Value,ea2Definition,ea2Value,ea3Definition,ea3Value,ea4Definition,ea4Value,ea5Definition,ea5Value,ea6Definition,ea6Value,ea7Definition,ea7Value,ea8Definition,ea8Value,ea9Definition,ea9Value,ea10Definition,ea10Value) ;