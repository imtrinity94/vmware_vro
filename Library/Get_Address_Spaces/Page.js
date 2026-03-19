/**
 * Page
 *
 * @param {number} attrSkip
 * @param {number} attrTop
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,ExtensionData:Properties,TotalCount:totalCount):AddressSpace} attrAddressSpaces
 * @return {Array/CompositeType(ID:string,Name:string,Description:string,ExtensionData:Properties,TotalCount:totalCount):AddressSpace} attrAddressSpaces
 */
System.log("Paging by parameters: Skip [" + attrSkip + "], Top [" + attrTop + "]...");

if (isNaN(attrSkip)) {
	throw "Unable to perform paging because parameter \"Skip\" is invalid.";
}

if (isNaN(attrTop)) {
	throw "Unable to perform paging because parameter \"Top\" is invalid.";
}

var resultPage = new Array();

for (var i = attrSkip; i < (attrTop + attrSkip) && i < attrAddressSpaces.length; i++) {
	resultPage.push(attrAddressSpaces[i]);
}

attrAddressSpaces = resultPage;
