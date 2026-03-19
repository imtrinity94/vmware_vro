/**
 * Generate Error Message
 *
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExtensionData:Properties,TotalCount:number):IPRange} attrIpRanges - [object Object]
 * @param {string} attrAddressSpace - [object Object]
 * @param {string} attrErrorMessage - [object Object]
 * @return {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExtensionData:Properties,TotalCount:number):IPRange} attrIpRanges - [object Object]
 */
var regexpWorkflow = /\s*(\(Workflow:.*\))/;
var resultArray = regexpWorkflow.exec(attrErrorMessage);
if (resultArray != null) {
	attrErrorMessage = attrErrorMessage.replace(resultArray[0], "");
}

var regexpCode = /[,.]\s*[Cc]ode:\s*(\d+)/;
var resultArray = regexpCode.exec(attrErrorMessage);
if (resultArray != null) {
	attrErrorMessage = attrErrorMessage.replace(resultArray[0], ".");
}

var errorObject = {
	Name: 'Error',
	Description: attrErrorMessage,
	Start: '',
	End: '',
	AddressSpaceId: attrAddressSpace
};

attrIpRanges = new Array();
attrIpRanges.push(errorObject);




