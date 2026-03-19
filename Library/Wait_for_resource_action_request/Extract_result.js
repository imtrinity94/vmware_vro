/**
 * Extract result
 *
 * @param {vCACCAFE:ResourceActionRequest} request
 * @param {Trigger} trigger
 * @return {string} result
 */
var result = vCACCAFERequestsHelper.extractTriggerResult(trigger);
System.log("Resource action request '" + request.vcoId + "' result '" + result + "'.");

if (result != "SUCCESSFUL") {
    vCACCAFEEntitiesFinder.invalidateEntity(request);
    request = vCACCAFEEntitiesFinder.getResourceActionRequest(vCACCAFEEntitiesFinder.getHostForEntity(request), request.id);
	if (request.requestCompletion == null) {
		System.error("No request completion details available!");
	} else {
		System.error("Request completion details: " + request.requestCompletion.getCompletionDetails());
	}
	throw result;
}