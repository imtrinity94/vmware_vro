/**
 * Convert EAs
 *
 * @param {InfobloxIPAM:IpamConnection} attrIpamConnection - [object Object]
 * @param {Array/CompositeType(name:string,value:string,operator:string):EaFilter} attrEaFilters - [object Object]
 * @return {Array/Any} attrSearchEas
 */
attrSearchEas = new Array();

for each (var eaFilter in attrEaFilters) {
	var definition = attrIpamConnection.getExtensibleAttributeDefinition(eaFilter.name);
	var extensibleAttribute = new IpamExtensibleAttribute(definition, eaFilter.value);
	var comparisonType = getComparisonType(eaFilter.operator);
	var searchableExtensibleAttribute = new IpamSearchableExtensibleAttribute(extensibleAttribute, comparisonType);
	attrSearchEas.push(searchableExtensibleAttribute);
}

function getComparisonType(operatorId) {
	switch (operatorId) {
	case "=":
		return IpamSearchComparisonType.EQUAL;

	case "!=":
		return IpamSearchComparisonType.NOT_EQUAL;

	case ":=":
		return IpamSearchComparisonType.EQUAL_CASE_INSENSITIVE;
	
	case "<=":
		return IpamSearchComparisonType.LESS_OR_EQUAL;

	case ">=":
		return IpamSearchComparisonType.GREATER_OR_EQUAL;

	case "~=":
		return IpamSearchComparisonType.REGULAR_EXPRESSION;

	default:
		throw "Unknown operation: " + operatorId;
	}
}
