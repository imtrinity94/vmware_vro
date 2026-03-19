/**
 * Filter
 *
 * @param {Array/string} IdCollection
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,ExtensionData:Properties,TotalCount:totalCount):AddressSpace} attrAddressSpaces
 * @return {Array/CompositeType(ID:string,Name:string,Description:string,ExtensionData:Properties,TotalCount:totalCount):AddressSpace} attrAddressSpaces
 */
var text = "Filtering by IDs:"

for each (var id in IdCollection) {
	text += "\n\t" + id;
}

System.log(text);

var filteredAddressSpaces = new Array();

for each (var addrSpace in attrAddressSpaces) {
	if (IdCollection.indexOf(addrSpace.ID) != -1) {
		filteredAddressSpaces.push(addrSpace);
	}
}

attrAddressSpaces = filteredAddressSpaces;

text = "Filtered address spaces:"

for each (var addrSpace in attrAddressSpaces) {
	text += "\n\t" + addrSpace.Name;
}

System.log(text);
