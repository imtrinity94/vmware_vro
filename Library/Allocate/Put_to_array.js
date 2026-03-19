/**
 * Put to array
 *
 * @param {CompositeType(AllocationRequestId:string,IPAddresses:Array/string,RangeId:string,IPVersion:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,DNSSuffix:string,DNSSearchSuffixes:string,PrimaryWINS:string,SecondaryWINS:string):AllocationResult} attrCurrentResult
 * @param {Array/CompositeType(AllocationRequestId:string,IPAddresses:Array/string,RangeId:string,IPVersion:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,DNSSuffix:string,DNSSearchSuffixes:string,PrimaryWINS:string,SecondaryWINS:string):AllocationResult} attrAllocationResults
 * @return {Array/CompositeType(AllocationRequestId:string,IPAddresses:Array/string,RangeId:string,IPVersion:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,DNSSuffix:string,DNSSearchSuffixes:string,PrimaryWINS:string,SecondaryWINS:string):AllocationResult} attrAllocationResults
 */
if (attrAllocationResults == null || attrAllocationResults == undefined) {
	attrAllocationResults = new Array();
}

attrAllocationResults.push(attrCurrentResult);
