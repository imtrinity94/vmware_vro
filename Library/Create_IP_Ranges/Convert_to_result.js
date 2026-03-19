/**
 * Convert to result
 *
 * @param {string} attrRequestId
 * @param {number} attrSubnetPrefixLength
 * @param {string} attrResultRangeId
 * @param {string} attrResultAddressSpaceId
 * @param {string} attrResultStartAddress
 * @param {string} attrResultEndAddress
 * @param {string} attrResultGateway
 * @return {CompositeType(CreateIPRangeRequestId:string,AddressSpaceId:string,RangeId:string,Start:string,End:string,Gateway:string,SubnetPrefixLength:string):CreateIPRangeResult} attrCurrentResult
 */
attrCurrentResult = {
	CreateIPRangeRequestId:attrRequestId,
	AddressSpaceId:attrResultAddressSpaceId,
	RangeId:attrResultRangeId,
	Start:attrResultStartAddress,
	End:attrResultEndAddress,
	Gateway:attrResultGateway,
	SubnetPrefixLength:attrSubnetPrefixLength
}
