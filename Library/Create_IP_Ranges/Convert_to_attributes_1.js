/**
 * Convert to attributes
 *
 * @param {CompositeType(Id:string,IPBlockIds:Array/string,AddressSpaceId:string,Start:string,End:string,AssignmentType:string,IPVersion:string,SubnetPrefixLength:number,Gateway:string,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExternalNetworkProfileId:string,NetworkProfileId:string,BlueprintRequestId:string):CreateIPRangeRequest} attrCurrentRequest
 * @return {string} attrRequestId
 * @return {Array/string} attrIPBlockIds
 * @return {string} attrNetworkProfileId
 * @return {string} attrExternalNetworkProfileId
 * @return {string} attrBlueprintRequestId
 */
attrRequestId = attrCurrentRequest.Id;
attrIPBlockIds = attrCurrentRequest.IPBlockIds;
attrNetworkProfileId = attrCurrentRequest.NetworkProfileId;
attrExternalNetworkProfileId = attrCurrentRequest.ExternalNetworkProfileId;
attrBlueprintRequestId = attrCurrentRequest.BlueprintRequestId;
