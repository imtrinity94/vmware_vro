/**
 * Convert to AddressSpaces
 *
 * @param {Array/Any} attrNetworkViews
 * @return {Array/CompositeType(ID:string,Name:string,Description:string,ExtensionData:Properties,TotalCount:totalCount):AddressSpace} attrAddressSpaces
 */
System.log("Converting network views to address spaces...");

attrAddressSpaces = new Array();

for (var i = 0; i < attrNetworkViews.length; i++) {
	attrAddressSpaces.push({
		ID: attrNetworkViews[i].name,
		Name: attrNetworkViews[i].name,
		Description: (attrNetworkViews[i].comment == null)?"":attrNetworkViews[i].comment,
		ExtensionData: new Properties(),
		TotalCount: attrNetworkViews.length
	});
}
