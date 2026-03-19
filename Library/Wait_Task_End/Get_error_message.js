/**
 * Get error message
 *
 * @param {SRM:ScriptingObjectTask} task
 * @return {string} errorCode
 */
var name = task.name != null ? "'" + task.name + "' " : "";
errorCode = "Task " + name + "error: " + task.getErrorMessage();