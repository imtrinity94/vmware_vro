/**
 * Validate inputs
 *
 * @param {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantName:string,Properties:Properties):ResourceNew} ResourceNew
 * @param {CompositeType(Id:string,URL:string,Username:string,Password:SecureString,Properties:Properties):Endpoint} EndpointNew
 * @param {Array/CompositeType(Id:string,AddressSpaceId:string,IPRangeIds:Array/string,Description:string,NicIndex:string,IPAddresses:Array/string):ReleaseRequestNew} ReleaseRequestNew
 */
if (ResourceNew == null || ResourceNew == undefined) {
	throw "Resource is not initialized."
}

if (EndpointNew == null || EndpointNew == undefined) {
	throw "Endpoint is not initialized."
}

if (ReleaseRequestNew == null || ReleaseRequestNew == undefined) {
	throw "Array of ReleaseRequests is not initialized."
}
