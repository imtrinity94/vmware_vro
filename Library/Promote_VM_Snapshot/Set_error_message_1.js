/**
 * Set error message
 *
 * @param {StoreServ:ProtectionTask} copyResult
 * @param {StoreServ:ProtectionConnection} connection
 * @return {string} errorMessage
 */
var copyPT = connection.queryTask(copyResult.taskId);

if(copyPT != undefined) {
	errorMessage = copyPT.errorDetails;
}
System.error(errorMessage);
throw errorMessage;