/**
 * Log the input text to the console log with level 'log'
 *
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,ExtensionData:Properties,TotalCount:totalCount):AddressSpace} attrAddressSpaces
 */
var text = "Result page:"

for each (var addrSpace in attrAddressSpaces) {
	text += "\n\tname=" + addrSpace.Name + ", description=" + addrSpace.Description;
}

System.log(text);
