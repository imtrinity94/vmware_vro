/**
 * @description Schedules a vRO workflow to run one hour from the current time.
 *              Passes example parameters and a custom task name when scheduling.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {Workflow} myWorkflow - The vRO workflow object to schedule.
 * @returns {Task} scheduledTask - The scheduled task object returned by the schedule call.
 */

var workflowToLaunch = myWorkflow;

// Create parameters
var workflowParameters = new Properties();
workflowParameters.put("name", "John Doe");

// Change the task name
workflowParameters.put("__taskName", "Workflow for John Doe");

// Create scheduling date one hour in the future
var workflowScheduleDate = new Date();
var time = workflowScheduleDate.getTime() + (60 * 60 * 1000);
workflowScheduleDate.setTime(time);

var scheduledTask = workflowToLaunch.schedule(workflowParameters, workflowScheduleDate);
