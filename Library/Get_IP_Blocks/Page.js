/**
 * Page
 *
 * @param {number} attrSkip
 * @param {number} attrTop
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:Array/string,SubnetPrefixLength:number,dnsServerAddresses:Array/string,netbiosServers:Array/string,DNSSuffix:string,DNSSearchSuffixes:Array/string,ExtensionData:Properties,TotalCount:string,Tags:Array/string):IPRange} attrIpRanges
 * @return {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:Array/string,SubnetPrefixLength:number,dnsServerAddresses:Array/string,netbiosServers:Array/string,DNSSuffix:string,DNSSearchSuffixes:Array/string,ExtensionData:Properties,TotalCount:string,Tags:Array/string):IPRange} attrIpRanges
 */
System.log("Paging by parameters: Skip [" + attrSkip + "], Top [" + attrTop + "]...");

if (isNaN(attrSkip)) {
	throw "Unable to perform paging because parameter \"Skip\" is invalid.";
}

if (isNaN(attrTop)) {
	throw "Unable to perform paging because parameter \"Top\" is invalid.";
}

var resultPage = new Array();

for (var i = attrSkip; i < (attrTop + attrSkip) && i < attrIpRanges.length; i++) {
	resultPage.push(attrIpRanges[i]);
}

attrIpRanges = resultPage;
