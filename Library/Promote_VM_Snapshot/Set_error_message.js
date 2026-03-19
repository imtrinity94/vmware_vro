/**
 * Set error message
 *
 * @param {StoreServ:ProtectionTask} mountResult
 * @param {StoreServ:ProtectionConnection} connection
 * @return {string} errorMessage
 */
var mountPT = connection.queryTask(mountResult.taskId);

if(mountPT != undefined) {
	errorMessage = mountPT.errorDetails;
}
System.error(errorMessage);
throw errorMessage;