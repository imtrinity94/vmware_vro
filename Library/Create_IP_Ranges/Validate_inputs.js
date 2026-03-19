/**
 * Validate inputs
 *
 * @param {Array/CompositeType(Id:string,IPBlockIds:Array/string,AddressSpaceId:string,Start:string,End:string,AssignmentType:string,IPVersion:string,SubnetPrefixLength:number,Gateway:string,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExternalNetworkProfileId:string,NetworkProfileId:string,BlueprintRequestId:string):CreateIPRangeRequest} CreateIPRangeRequests
 * @param {CompositeType(Id:string,URL:string,Username:string,Password:SecureString,Properties:Properties):Endpoint} Endpoint
 */
if (CreateIPRangeRequests == null || CreateIPRangeRequests == undefined || CreateIPRangeRequests.length == 0) {
	throw "Array of CreateIPRangeRequests is not initialized or empty."
}

if (Endpoint == null || Endpoint == undefined) {
	throw "Endpoint is not initialized."
}
