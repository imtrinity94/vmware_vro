/**
 * Log the input text to the console log with level 'log'
 *
 * @param {CompositeType(ReleaseRequestId:string,Status:string,ErrorCode:string,ErrorMessage:string):ReleaseResult} attrCurrentResult
 */
var text = "Release result:"
	+ "\n\tReleaseRequestId: " + attrCurrentResult.ReleaseRequestId
	+ "\n\tStatus: " + attrCurrentResult.Status
	+ "\n\tErrorCode: " + attrCurrentResult.ErrorCode
	+ "\n\tErrorMessage: " + attrCurrentResult.ErrorMessage;

System.log(text);
