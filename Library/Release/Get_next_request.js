/**
 * Get next request
 *
 * @param {number} attrCurrentIndex
 * @param {Array/CompositeType(Id:string,AddressSpaceId:string,IPRangeIds:Array/string,Description:string,NicIndex:string,IPAddresses:Array/string):ReleaseRequestNew} ReleaseRequestNew
 * @return {CompositeType(Id:string,IPAddress:string,IPRangeId:string,Description:string,NetworkProfileId:string,NetworkProfileType:string,NicIndex:number):ReleaseRequest} attrCurrentRequest
 */
attrCurrentRequest = ReleaseRequestNew[attrCurrentIndex];