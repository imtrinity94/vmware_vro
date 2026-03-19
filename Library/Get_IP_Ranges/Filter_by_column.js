/**
 * Filter by column
 *
 * @param {string} attrColumnName
 * @param {string} attrColumnSubstring
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExtensionData:Properties,TotalCount:number):IPRange} attrIpRanges
 * @return {Array/CompositeType(ID:string,Name:string,Description:string,Start:string,End:string,IPVersion:string,AddressSpaceId:string,Gateway:string,SubnetPrefixLength:number,PrimaryDNS:string,SecondaryDNS:string,PrimaryWINS:string,SecondaryWINS:string,DNSSuffix:string,DNSSearchSuffixes:string,ExtensionData:Properties,TotalCount:number):IPRange} attrIpRanges
 */
System.log("Filtering by column filter: Name [" + attrColumnName + "], Substing [" + attrColumnSubstring + "]...");

var filteredIpRanges = new Array();

switch (attrColumnName) {
case 'start':
	attrIpRanges.forEach(filterByStart);
	break;
case 'end':
	attrIpRanges.forEach(filterByEnd);
	break;
case 'name':
	attrIpRanges.forEach(filterByName);
	break;
case 'description':
	attrIpRanges.forEach(filterByDescription);
	break;
default:
	throw "Unknown column name [" + attrColumnName + "] for filtering by column substring."
}

attrIpRanges = filteredIpRanges;

var text = "Filtered IP ranges:"

for each (var ipRange in attrIpRanges) {
	text += "\n\t" + ipRange.Name + ", " + ipRange.AddressSpaceId;
}

System.log(text);

function filterByStart(element, index) {
	var value = element.Start.toLowerCase();
	if (value.indexOf(attrColumnSubstring) != -1) {
		filteredIpRanges.push(element);
	}
}

function filterByEnd(element, index) {
	var value = element.End.toLowerCase();
	if (value.indexOf(attrColumnSubstring) != -1) {
		filteredIpRanges.push(element);
	}
}

function filterByName(element, index) {
	var value = element.Name.toLowerCase();
	if (value.indexOf(attrColumnSubstring) != -1) {
		filteredIpRanges.push(element);
	}
}

function filterByDescription(element, index) {
	if (element.Description) {
		var value = element.Description.toLowerCase();
		if (value.indexOf(attrColumnSubstring) != -1) {
			filteredIpRanges.push(element);
		}
	}
}
