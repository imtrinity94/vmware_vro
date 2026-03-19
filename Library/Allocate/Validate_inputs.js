/**
 * Validate inputs
 *
 * @param {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantId:string,TenantName:string,Properties:Properties):Resource} Resource
 * @param {Array/CompositeType(Id:string,AddressSpaceId:string,IPRangeIds:Array/string,Description:string,Start:string,Size:string,NetworkProfileId:string,ExternalNetworkProfileId:string,NetworkProfileType:string,BlueprintRequestId:string,NicIndex:number,IsPrimary:boolean):AllocationRequest} AllocationRequests - [object Object]
 * @param {CompositeType(Id:string,URL:string,Username:string,Password:SecureString,Properties:Properties):Endpoint} Endpoint - [object Object]
 * @param {CompositeType(Id:string,Name:string,Description:string,Type:string,TenantName:string,Properties:Properties):ResourceNew} ResourceNew
 * @param {Array/CompositeType(Id:string,AddressSpaceId:string,IPRangeIds:Array/string,Description:string,Start:string,Size:string,NetworkProfileId:string,ExternalNetworkProfileId:string,NetworkProfileType:string,BlueprintRequestId:string,NicIndex:number,IsPrimary:boolean):AllocationRequest} AllocationRequestsNew
 * @param {CompositeType(Id:string,URL:string,Username:string,Password:SecureString,Properties:Properties):Endpoint} EndpointNew
 * @param {Array/CompositeType(id:string,description:string,ipRangeIds:Array/string,nicIndex:number,isPrimary:boolean,start:string,size:number,properties:Properties):IPAllocationRequest} IPAllocationRequestsNew
 */
System.log("Entering validate inputs task")
if (ResourceNew == null || ResourceNew == undefined) {
	throw "Resource is not initialized."
}

if (EndpointNew == null || EndpointNew == undefined) {
	throw "Endpoint is not initialized."
}

if(IPAllocationRequestsNew ==null || IPAllocationRequestsNew == undefined){
    throw "Aray of allocaiton requests is not initialized"
}
