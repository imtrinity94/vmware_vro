/**
 * Get next request
 *
 * @param {Array/CompositeType(Id:string,AddressSpaceId:string,IPRangeIds:Array/string,Description:string,Start:string,Size:string,NetworkProfileId:string,ExternalNetworkProfileId:string,NetworkProfileType:string,BlueprintRequestId:string,NicIndex:number,IsPrimary:boolean):AllocationRequest} AllocationRequests - [object Object]
 * @param {number} attrCurrentIndex - [object Object]
 * @param {Array/CompositeType(Id:string,AddressSpaceId:string,IPRangeIds:Array/string,Description:string,Start:string,Size:string,NetworkProfileId:string,ExternalNetworkProfileId:string,NetworkProfileType:string,BlueprintRequestId:string,NicIndex:number,IsPrimary:boolean):AllocationRequest} AllocationRequestsNew
 * @param {Array/CompositeType(id:string,description:string,ipRangeIds:Array/string,nicIndex:number,isPrimary:boolean,start:string,size:number,properties:Properties):IPAllocationRequest} IPAllocationRequestsNew
 * @return {CompositeType(id:string,description:string,ipRangeIds:Array/string,nicIndex:number,isPrimary:boolean,start:string,size:number,properties:Properties):IPAllocationRequest} attrCurrentRequest
 */
attrCurrentRequest = IPAllocationRequestsNew[attrCurrentIndex];
System.log("This is the attrCurrent Request data for reference")