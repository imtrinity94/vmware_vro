/**
 * Log the input text to the console log with level 'log'
 *
 * @param {CompositeType(DeleteIPRangeRequestId:string,Status:string,ErrorCode:string,ErrorMessage:string):DeleteIPRangeResult} attrCurrentResult - [object Object]
 */
var text = "Deleting IP Range result:"
	+ "\n\tDeleteIPRangeRequestId: " + attrCurrentResult.DeleteIPRangeRequestId
	+ "\n\tStatus: " + attrCurrentResult.Status
	+ "\n\tErrorCode: " + attrCurrentResult.ErrorCode
	+ "\n\tErrorMessage: " + attrCurrentResult.ErrorMessage;

System.log(text);