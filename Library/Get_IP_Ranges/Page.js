/**
 * Page
 *
 * @param {number} attrSkip
 * @param {number} attrTop
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExtensionData:Properties,TotalCount:number):IPRange} attrIpRanges
 * @return {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExtensionData:Properties,TotalCount:number):IPRange} attrIpRanges
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
