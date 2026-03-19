/**
 * Watch Restore Status
 *
 * @param {number} restoreJobId - [object Object]
 * @param {CS:CohesityConnection} connection
 * @return {string} jobStatus - [object Object]
 */
try {
    // set variables.  Here repeatedly using a module / action.  
    var checkStatus = System.getModule("com.cohesity.plugin.protectionSources");
    // create null jobStatus
    var jobStatus = "";
    // check status until it is kFinished
    while (jobStatus != "kFinished") {
        jobStatus = checkStatus.getRecoveryTaskStatusById(restoreJobId, connection);
        System.log("The current request status is " + jobStatus);
		System.sleep(30000);
    }
} catch (err) {
	System.error(err);
    throw ("[System Error] Something went wrong with the restore virtual disk request. Error: " + err);
}