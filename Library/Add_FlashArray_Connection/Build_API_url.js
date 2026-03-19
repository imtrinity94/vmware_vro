/**
 * Build API url
 *
 * @param {string} baseUrl - [object Object]
 * @param {string} apiVersion - [object Object]
 * @param {boolean} autoPopulateApiVersions - [object Object]
 * @return {string} restUrl
 */
if(autoPopulateApiVersions){
	// Here we get the correct Base URL after validation. So no need to check again.
	if(baseUrl.charAt(baseUrl.length-1) == '/'){
		restUrl = baseUrl + "api/" + apiVersion;
	}
	else{
		restUrl = baseUrl + "/api/" + apiVersion;
	}
}
else{
restUrl = baseUrl;
}
