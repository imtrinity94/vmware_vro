/**
 * @description Iterates through all scheduled tasks (WorkflowToken type), logs their properties,
 *              and cancels any task that is 100% complete and in a "completed" state.
 *              Logs an error for tasks that are 100% complete but in a "failed" state.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @returns {void}
 */

var scheduledTasksList = Server.findAllForType('Task');

var i;
for (i = 0; i < scheduledTasksList.length; i++) {
    var taskObj = scheduledTasksList[i];

    System.log("Checking task: " + taskObj.name + " (State: " + taskObj.state + ")");

    if (taskObj.percentCompleted == 100) {
        if (taskObj.state == "completed") {
            System.warn("Deleting completed scheduled task: " + taskObj.name);
            taskObj.cancel();
        } else if (taskObj.state == "failed") {
            System.error("Completed scheduled task failed: " + taskObj.name + " (" + taskObj.error + ")");
        }
    }
}

return null;
