/**
 * Simple task with custom script capability.
 *
 * @param {CompositeType(AllocationRequestId:string,IPAddresses:Array/string,RangeId:string,IPVersion:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,DNSSuffix:string,DNSSearchSuffixes:string,PrimaryWINS:string,SecondaryWINS:string):AllocationResult} attrCurrentResult
 */
var text = "Allocation result:"
	+ "\n\tAllocationRequestId: " + attrCurrentResult.AllocationRequestId
	+ "\n\tIPAddresses: " + attrCurrentResult.IPAddresses.join(",")
	+ "\n\tRangeId: " + attrCurrentResult.RangeId
	+ "\n\tIPVersion: " + attrCurrentResult.IPVersion
	+ "\n\tSubnetPrefixLength: " + attrCurrentResult.SubnetPrefixLength
	+ "\n\tGateway: " + attrCurrentResult.Gateway
	+ "\n\tDNSSuffix: " + attrCurrentResult.DNSSuffix
	+ "\n\tDNSSearchSuffixes: " + attrCurrentResult.DNSSearchSuffixes
	+ "\n\tPrimaryDNS: " + attrCurrentResult.PrimaryDNS
	+ "\n\tSecondaryDNS: " + attrCurrentResult.SecondaryDNS
	+ "\n\tPrimaryWINS: " + attrCurrentResult.PrimaryWINS
	+ "\n\tSecondaryWINS: " + attrCurrentResult.SecondaryWINS;

System.log(text);