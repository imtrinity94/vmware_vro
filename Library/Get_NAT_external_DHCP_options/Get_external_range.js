/**
 * Get external range
 *
 * @param {Any} range - [object Object]
 * @param {string} attrExternalRangeIdName
 * @return {string} attrExternalRangeId
 */
if ((range.extensibleAttributes != null) && (range.extensibleAttributes != undefined) && (range.extensibleAttributes.length > 0)) {
	for (var i = 0, len = range.extensibleAttributes.length; i < len; i++) {
		if (range.extensibleAttributes[i].name == attrExternalRangeIdName) {
			attrExternalRangeId = range.extensibleAttributes[i].value;
		}
	}
}