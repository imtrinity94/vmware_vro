/**
 * Log the input text to the console log with level 'log'
 *
 * @param {CompositeType(Skip:number,Top:number,Filter:string,OrderBy:string):PagingAndSorting} PagingAndSorting
 * @param {string} AdditionalFilter
 * @param {Array/string} IdCollection
 */
var text;

if (PagingAndSorting != null && PagingAndSorting != undefined) {
	text = "Parameters for paging and sorting:"
	text += "\n\tSkip: " + PagingAndSorting.Skip;
	text += "\n\tTop: " + PagingAndSorting.Top;
	text += "\n\tFilter: " + PagingAndSorting.Filter;
	text += "\n\tOrderBy: " + PagingAndSorting.OrderBy;
	System.log(text);
} else {
	System.log("Parameters for paging and sorting are not defined.");
}

if (AdditionalFilter) {
	System.log("Additional filter:\n\t" + AdditionalFilter);
} else {
	System.log("Additional filter is not defined.");
}

if (IdCollection) {
	System.log("IdCollection:\n\t" + IdCollection);
} else {
	System.log("IdCollection is not defined.");
}
