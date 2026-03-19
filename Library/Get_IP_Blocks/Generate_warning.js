/**
 * Generate warning
 *
 * @param {string} attrAddressSpace - [object Object]
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:Array/string,SubnetPrefixLength:number,dnsServerAddresses:Array/string,netbiosServers:Array/string,DNSSuffix:string,DNSSearchSuffixes:Array/string,ExtensionData:Properties,TotalCount:string,Tags:Array/string):IPRange} attrIpRanges - [object Object]
 * @return {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:Array/string,SubnetPrefixLength:number,dnsServerAddresses:Array/string,netbiosServers:Array/string,DNSSuffix:string,DNSSearchSuffixes:Array/string,ExtensionData:Properties,TotalCount:string,Tags:Array/string):IPRange} attrIpRanges - [object Object]
 */
if (attrIpRanges == null) {
	attrIpRanges = new Array();
} 
attrIpRanges.push({
	Name: 'WARNING',
	Description: 'Not all data returned. Use filters to narrow results.',
	Start: '',
	End: '',
	AddressSpaceId: attrAddressSpace
});