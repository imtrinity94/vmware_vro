/**
 * Log the input text to the console log with level 'log'
 *
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:Array/string,SubnetPrefixLength:number,dnsServerAddresses:Array/string,netbiosServers:Array/string,DNSSuffix:string,DNSSearchSuffixes:Array/string,ExtensionData:Properties,TotalCount:string,Tags:Array/string):IPRange} attrIpRanges
 */
var text = "Result page:"

for each (var ipRange in attrIpRanges) {
	text += "\n\t" + ipRange.Name + ", " + ipRange.AddressSpaceId;
}

System.log(text);
