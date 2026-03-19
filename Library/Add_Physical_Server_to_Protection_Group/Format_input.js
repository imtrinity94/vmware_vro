/**
 * Format input
 *
 * @param {CS:CohesityConnection} connection
 * @param {string} pjob_startTime
 * @return {number} parentSourceId
 * @return {number} startTime_hour
 * @return {number} startTime_minute
 */
// The parent source id for the physical machine.
parentSourceId = System.getModule("com.cohesity.plugin.protectionSources").getPhysicalParentSourceId(connection);

var startTimeArr = pjob_startTime.split(':');
if (startTimeArr.length != 2) {
	throw "[Invalid Input] Invalid start time specified. Specify time in HH:MM format.";
}

startTime_hour = startTimeArr[0];
startTime_minute = startTimeArr[1];

