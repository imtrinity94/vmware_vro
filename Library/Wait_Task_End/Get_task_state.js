/**
 * Get task state
 *
 * @param {SRM:ScriptingObjectTask} task
 * @return {string} taskState
 */
taskState = task.getState();
System.log("Task " + task.name + " state: " + taskState);