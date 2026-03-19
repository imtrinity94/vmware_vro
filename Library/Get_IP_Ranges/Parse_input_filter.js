/**
 * Parse input filter
 *
 * @param {CompositeType(Skip:number,Top:number,Filter:string,OrderBy:string):PagingAndSorting} PagingAndSorting - [object Object]
 * @return {string} attrAddressSpace
 */
// we need to parse filter if present to extract address space for result record
if (PagingAndSorting != null && PagingAndSorting != undefined && PagingAndSorting.Filter != null) {
	System.log("Parsing the filter [" + PagingAndSorting.Filter + "]...");

	var splitFilters = PagingAndSorting.Filter.split(/and/i);
	var addrspacePattern = /\s*addressSpaceId\s*eq\s*'([^']+)'\s*/;

	for each (var filter in splitFilters) {
		if (!filter) {
			continue;
		}
	
		if (addrspacePattern.test(filter)) {
			var resultArray = addrspacePattern.exec(filter);
			if (resultArray != null) {
				attrAddressSpace = resultArray[1];
				System.log("Got address space: " + attrAddressSpace);
			}
		} 
	}
}
