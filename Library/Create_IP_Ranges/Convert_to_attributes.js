/**
 * Convert to attributes
 *
 * @param {CompositeType(Id:string,IPBlockIds:Array/string,AddressSpaceId:string,Start:string,End:string,AssignmentType:string,IPVersion:string,SubnetPrefixLength:number,Gateway:string,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExternalNetworkProfileId:string,NetworkProfileId:string,BlueprintRequestId:string):CreateIPRangeRequest} attrCurrentRequest
 * @return {string} attrRequestId
 * @return {Array/string} attrIPBlockIds
 * @return {string} attrAddressSpaceId
 * @return {string} attrStartAddress
 * @return {string} attrEndAddress
 * @return {string} attrAssignmentType
 * @return {string} attrIPVersion
 * @return {number} attrSubnetPrefixLength
 * @return {string} attrGateway
 * @return {string} attrPrimaryDNS
 * @return {string} attrSecondaryDNS
 * @return {string} attrPrimaryWINS
 * @return {string} attrSecondaryWINS
 * @return {string} attrDNSSuffix
 * @return {Array/string} attrDNSSearchSuffixes
 * @return {string} attrNetworkProfileId
 * @return {string} attrExternalNetworkProfileId
 * @return {string} attrBlueprintRequestId
 */
attrRequestId = attrCurrentRequest.Id;
attrIPBlockIds = attrCurrentRequest.IPBlockIds;
attrAddressSpaceId = attrCurrentRequest.AddressSpaceId;
attrStartAddress = attrCurrentRequest.Start;
attrEndAddress = attrCurrentRequest.End;
attrAssignmentType = attrCurrentRequest.AssignmentType;
attrIPVersion = attrCurrentRequest.IPVersion;
attrSubnetPrefixLength = parseInt(attrCurrentRequest.SubnetPrefixLength);

attrGateway = attrCurrentRequest.Gateway;
attrPrimaryDNS = attrCurrentRequest.PrimaryDNS;
attrSecondaryDNS = attrCurrentRequest.SecondaryDNS;
attrPrimaryWINS = attrCurrentRequest.PrimaryWINS;
attrSecondaryWINS = attrCurrentRequest.SecondaryWINS;
attrDNSSuffix = attrCurrentRequest.DNSSuffix;
attrDNSSearchSuffixes = [];
if (attrCurrentRequest.DNSSearchSuffixes) {
	var searchSuffixes = attrCurrentRequest.DNSSearchSuffixes;
	attrDNSSearchSuffixes = searchSuffixes.split(/\s*,\s*/);
}

attrNetworkProfileId = attrCurrentRequest.NetworkProfileId;
attrExternalNetworkProfileId = attrCurrentRequest.ExternalNetworkProfileId;
attrBlueprintRequestId = attrCurrentRequest.BlueprintRequestId;

if (isNaN(attrSubnetPrefixLength)) {
	throw "Invalid SubnetPrefixLength: \"" + attrSubnetPrefixLength + "\"";
}
