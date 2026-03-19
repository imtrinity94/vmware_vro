/**
 * @description Schedules a vRO workflow to run one hour from the current time.
 *              Passes example parameters and a custom task name when scheduling.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {Workflow} vcWorkflowObj - The vRO workflow object to schedule.
 * @returns {Task} scheduledTaskObj - The scheduled task object returned by the schedule call.
 */

if (!vcWorkflowObj) {
    throw "Target workflow object must be provided for scheduling.";
}

var scheduleParametersMap = new Properties();
scheduleParametersMap.put("initiator", "Automatic Scheduler");
scheduleParametersMap.put("__taskName", "Deferred execution for: " + vcWorkflowObj.name);

// Calculate scheduled run time (Current time + 1 hour)
var startDateObj = new Date();
var oneHourInMilliseconds = 60 * 60 * 1000;
startDateObj.setTime(startDateObj.getTime() + oneHourInMilliseconds);

System.log("Scheduling workflow '" + vcWorkflowObj.name + "' to execute at: " + startDateObj.toLocaleString());

var scheduledTaskObj = vcWorkflowObj.schedule(scheduleParametersMap, startDateObj);

if (scheduledTaskObj) {
    System.log("Workflow scheduled successfully. Task ID: " + scheduledTaskObj.id);
} else {
    System.error("Failed to schedule workflow.");
}

return scheduledTaskObj;
