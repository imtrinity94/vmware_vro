/**
 * update
 *
 * @param {string} name
 * @param {VUM:BaselineContentType} contentType
 * @param {string} description
 * @param {Array/VUM:PatchInfo} includePatch
 * @param {Array/VUM:PatchInfo} excludePatch
 * @param {string} phrase
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {Array/string} vendor
 * @param {Array/string} product
 * @param {Array/VUM:Severity} severity
 * @param {Array/VUM:UpdateType} updateType
 * @param {VUM:Baseline} baseline
 * @param {Array/VUM:HostUpdateCategory} hostUpdateCategory
 */
function getStringArrayFromEnumArray(enumArray) {
	if(null == enumArray) {
		return null;
	}
	var stringArray = new Array(enumArray.length);
	for(var i=0; i<enumArray.length; i++){
		stringArray[i] = enumArray[i].id;
	}
	return stringArray;
}

if (baseline) {
	baseline.name = name;
	baseline.description = description;
	baseline.setContentTypeFromString(contentType.id);
	baseline.inclPatches = includePatch;
	baseline.exclPatches = excludePatch;
	var searchSpec = null;
	if ('BOTH' == contentType.id || 'DYNAMIC' == contentType.id) {
	   searchSpec = new VumPatchSearchSpec(baseline.serverUri);
	   if (phrase || startDate || endDate || vendor || product || severity || updateType || hostUpdateCategory) {
	       searchSpec.phrase = phrase;
	       searchSpec.startDate = startDate;
	       searchSpec.endDate = endDate;
           searchSpec.vendor = vendor;
           searchSpec.product = product;
           searchSpec.setSeverityFromStrings(getStringArrayFromEnumArray(severity));
	       searchSpec.setUpdateTypeFromStrings(getStringArrayFromEnumArray(updateType));
	       searchSpec.setHostUpdateCategoryFromStrings(getStringArrayFromEnumArray(hostUpdateCategory));
	   }
	}
	baseline.patchSearchSpec = searchSpec;
	VumObjectManager.updatePatchBaseline(baseline);
}