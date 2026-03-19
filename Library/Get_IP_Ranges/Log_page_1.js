/**
 * Log the input text to the console log with level 'log'
 *
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExtensionData:Properties,TotalCount:number):IPRange} attrIpRanges
 */
var text = "Result page:"

for each (var ipRange in attrIpRanges) {
	text += "\n\t" + ipRange.Name + ", " + ipRange.AddressSpaceId + " " + ipRange.Description;
}

System.log(text);
