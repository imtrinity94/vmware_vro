/**
 * Put to array
 *
 * @param {CompositeType(ReleaseRequestId:string,Status:string,ErrorCode:string,ErrorMessage:string):ReleaseResult} attrCurrentResult
 * @param {Array/CompositeType(ReleaseRequestId:string,Status:string,ErrorCode:string,ErrorMessage:string):ReleaseResult} attrReleaseResults
 * @return {Array/CompositeType(ReleaseRequestId:string,Status:string,ErrorCode:string,ErrorMessage:string):ReleaseResult} attrReleaseResults
 */
if (attrReleaseResults == null || attrReleaseResults == undefined) {
	attrReleaseResults = new Array();
}

attrReleaseResults.push(attrCurrentResult);