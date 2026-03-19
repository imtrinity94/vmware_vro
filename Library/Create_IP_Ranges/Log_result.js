/**
 * Log the input text to the console log with level 'log'
 *
 * @param {CompositeType(CreateIPRangeRequestId:string,AddressSpaceId:string,RangeId:string,Start:string,End:string,Gateway:string,SubnetPrefixLength:string):CreateIPRangeResult} attrCurrentResult
 */
var text = "Create IP range result:"
	+ "\n\tCreateIPRangeRequestId: " + attrCurrentResult.CreateIPRangeRequestId
	+ "\n\tRangeId: " + attrCurrentResult.RangeId
	+ "\n\tAddressSpaceId: " + attrCurrentResult.AddressSpaceId
	+ "\n\tStart: " + attrCurrentResult.Start
	+ "\n\tEnd: " + attrCurrentResult.End
	+ "\n\tGateway: " + attrCurrentResult.Gateway
	+ "\n\tSubnetPrefixLength: " + attrCurrentResult.SubnetPrefixLength

System.log(text);