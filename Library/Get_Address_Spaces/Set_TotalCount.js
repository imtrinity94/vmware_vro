/**
 * Set TotalCount
 *
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,ExtensionData:Properties,TotalCount:totalCount):AddressSpace} attrAddressSpaces
 * @return {Array/CompositeType(ID:string,Name:string,Description:string,ExtensionData:Properties,TotalCount:totalCount):AddressSpace} attrAddressSpaces
 */
var totalCount = attrAddressSpaces.length;

System.log("Setting TotalCount = " + totalCount);

for each (var addrSpace in attrAddressSpaces) {
	addrSpace.TotalCount = totalCount;
}
