/**
 * Conver to attributes
 *
 * @param {CompositeType(Skip:number,Top:number,Filter:string,OrderBy:string):PagingAndSorting} PagingAndSorting
 * @return {number} attrSkip
 * @return {number} attrTop
 * @return {string} attrFilter
 * @return {string} attrOrderBy
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
