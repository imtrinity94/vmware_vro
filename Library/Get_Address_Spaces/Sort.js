/**
 * Sort
 *
 * @param {string} attrOrderBy
 * @param {Array/CompositeType(ID:string,Name:string,Description:string,ExtensionData:Properties,TotalCount:totalCount):AddressSpace} attrAddressSpaces
 * @return {Array/CompositeType(ID:string,Name:string,Description:string,ExtensionData:Properties,TotalCount:totalCount):AddressSpace} attrAddressSpaces
 */
System.log("Parsing parameters for sorting [" + attrOrderBy + "]...");

var orderBy = {};
var splitedOrderBy = attrOrderBy.split(" ");
orderBy.ParameterName = splitedOrderBy[0].replace(":", "");
orderBy.IsAscending = splitedOrderBy.length == 1 || splitedOrderBy[1] == "ASC";

System.log("Sorting by ColumnName [" + orderBy.ParameterName +"], IsAscending [" + orderBy.IsAscending + "]...");
	
attrAddressSpaces.sort(dynamicSort(orderBy.ParameterName , orderBy.IsAscending));

function dynamicSort(property, order) { 
    var propName = "Name"; 
    
	if (property == "name") {
		propName = "Name";
	} else if (property == "description") {
		propName = "Description";
	}
	
    return function (a,b) {
		if (order == 1) {
        	return (a[propName] < b[propName]) ? -1 : (a[propName] > b[propName]) ? 1 : 0;
		} else {
			return (b[propName] < a[propName]) ? -1 : (b[propName] > a[propName]) ? 1 : 0;
		}
    }
}
