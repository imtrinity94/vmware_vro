/**
 * Init EAs
 *
 * @param {Array/CompositeType(name:string,value:string,operator:string):EaFilter} attrEaFilters - [object Object]
 * @return {Array/CompositeType(name:string,value:string,operator:string):EaFilter} attrEaFilters - [object Object]
 */
attrEaFilters = new Array();
attrEaFilters.push({
	name:"VMware On-Demand Network",
	value:"True",
	operator:"!=",
});
System.log("Init EAS: \n\t" + attrEaFilters[0].name + " " + attrEaFilters[0].operator + " " + attrEaFilters[0].value);
