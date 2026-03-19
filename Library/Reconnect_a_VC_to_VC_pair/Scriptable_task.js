/**
 * Scriptable task
 *
 * @param {Array/Properties} vcEndpoints
 * @return {string} vcUuid
 * @return {Any} vcList
 * @return {Array/string} vcNames
 */
if (vcEndpoints.length == 1) {
	vcUuid = vcEndpoints[0].uuid
} else {
	vcList = {}
	vcNames = []

	for (var i = 0; i < vcEndpoints.length; ++i) {
		vcName = vcEndpoints[i].name ? vcEndpoints[i].name : vcEndpoints[i].uri
		vcList[vcName] = vcEndpoints[i].uuid
		vcNames.push(vcName)
	}
}