/**
 * Set error message
 *
 * @param {StoreServ:ProtectionTask} unmountResult
 * @param {StoreServ:ProtectionTask} copyResult
 * @param {boolean} copySuccess
 * @param {boolean} unmountSuccess
 * @param {StoreServ:ProtectionConnection} connection
 * @return {string} errorMessage
 */
if(!copySuccess) {
	var copyPT = connection.queryTask(copyResult.taskId);

	if(copyPT != undefined) {
		if((errorMessage != undefined) && (errorMessage != null)) {
			errorMessage = errorMessage + copyPT.errorDetails;
		}else {
			errorMessage = copyPT.errorDetails;
		}
	}
}

if(!unmountSuccess){
	var unmountPT = connection.queryTask(unmountResult.taskId);

	if(unmountPTT != undefined) {
		if((errorMessage != undefined) && (errorMessage != null)) {
			errorMessage = errorMessage + unmountPTT.errorDetails;
		}else {
			errorMessage = unmountPTT.errorDetails;
		}
	}
}

System.error(errorMessage);
throw errorMessage;