/**
 * Init attributes
 *
 * @param {CompositeType(Skip:number,Top:number,Filter:string,OrderBy:string):PagingAndSorting} PagingAndSorting
 * @param {CompositeType(Id:string,URL:string,Username:string,Password:SecureString,Properties:Properties):Endpoint} Endpoint - [object Object]
 * @param {number} attrMaxResults - [object Object]
 * @param {number} attrVacantResults - [object Object]
 * @return {number} attrSkip
 * @return {number} attrTop
 * @return {string} attrFilter
 * @return {string} attrOrderBy
 * @return {number} attrMaxResults - [object Object]
 * @return {number} attrVacantResults - [object Object]
 */
if (PagingAndSorting != null && PagingAndSorting != undefined) {
	attrSkip = PagingAndSorting.Skip;
	attrTop = PagingAndSorting.Top;
	attrFilter = PagingAndSorting.Filter;
	attrOrderBy = PagingAndSorting.OrderBy;
} else {
	attrSkip = null;
	attrTop = null;
	attrFilter = null;
	attrOrderBy = null;
}
if (Endpoint.Properties != null
	&& Endpoint.Properties != undefined) {

    for (var i = 0; i < Endpoint.Properties.length; i++) {
        var property = Endpoint.Properties[i];
        if (property.prop_key == "Infoblox.IPAM.GetIPRanges.maxResults"){
	        var maxResults = parseInt(property.prop_value);
        }
    }
    System.log(maxResults)
	    if (!isNaN(maxResults) && (maxResults > 0)) {
		    attrVacantResults = attrMaxResults = maxResults;
		    System.log("Got maximum results value: " + attrMaxResults);
	}
}
