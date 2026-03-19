/**
 * Set Status Out
 *
 * @param {CompositeType(status:string,message:string):runStatus} tRunStatus
 * @return {CompositeType(status:string,message:string):runStatus} runStatus
 */
if (!tRunStatus) {
	System.warn("Status of the job is unknown. Run Status="+tRunStatus);
} else {
	System.log("Final job status is " + tRunStatus.status);
	runStatus = tRunStatus;
}

