/**
 * Save results
 *
 * @param {CompositeType(CreateIPRangeRequestId:string,AddressSpaceId:string,RangeId:string,Start:string,End:string,Gateway:string,SubnetPrefixLength:string):CreateIPRangeResult} attrCurrentResult
 * @param {Array/CompositeType(CreateIPRangeRequestId:string,AddressSpaceId:string,RangeId:string,Start:string,End:string,Gateway:string,SubnetPrefixLength:string):CreateIPRangeResult} attrResultCollection
 * @return {Array/CompositeType(CreateIPRangeRequestId:string,AddressSpaceId:string,RangeId:string,Start:string,End:string,Gateway:string,SubnetPrefixLength:string):CreateIPRangeResult} attrResultCollection
 */
if (attrResultCollection == null || attrResultCollection == undefined) {
	attrResultCollection = new Array();
}

attrResultCollection.push(attrCurrentResult);