/**
 * Generate warning
 *
 * @param {string} attrAddressSpace - [object Object]
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExtensionData:Properties,TotalCount:number):IPRange} attrIpRanges - [object Object]
 * @return {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExtensionData:Properties,TotalCount:number):IPRange} attrIpRanges - [object Object]
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