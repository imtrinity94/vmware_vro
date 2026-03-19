/**
 * Convert to result
 *
 * @param {string} attrRequestId - [object Object]
 * @param {string} attrErrorMessage - [object Object]
 * @return {CompositeType(ReleaseRequestId:string,Status:string,ErrorCode:string,ErrorMessage:string):ReleaseResult} attrCurrentResult - [object Object]
 */
var ipamErrorCode = 3000;	// internal error code
var ipamErrorMessage = attrErrorMessage;

var regexp = /[,.]\s*[Cc]ode:\s*(\d+)/;
var resultArray = regexp.exec(attrErrorMessage);
if (resultArray != null) {
	ipamErrorMessage = attrErrorMessage.replace(resultArray[0], ".");
	ipamErrorCode = parseInt(resultArray[1]);
	
	if(isNaN(ipamErrorCode)) {
		ipamErrorCode = 3000;
	}
}

attrCurrentResult = {
	ReleaseRequestId:attrRequestId,
	Status:"Failure",
	ErrorMessage:ipamErrorCode,
	ErrorCode:ipamErrorMessage
};