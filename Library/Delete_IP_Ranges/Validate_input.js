/**
 * Validate input
 *
 * @param {Array/CompositeType(Id:string,RangeId:string):DeleteIPRangeRequest} DeleteIPRangeRequests
 * @param {CompositeType(Id:string,URL:string,Username:string,Password:SecureString,Properties:Properties):Endpoint} Endpoint
 */
if (DeleteIPRangeRequests == null || DeleteIPRangeRequests == undefined || DeleteIPRangeRequests.length == 0) {
	throw "Array of DeleteIPRangeRequests is not initialized or empty."
}

if (Endpoint == null || Endpoint == undefined) {
	throw "Endpoint is not initialized."
}
