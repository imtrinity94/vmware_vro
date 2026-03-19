/**
 * Retrieves and logs the full inventory folder path of the currently executing workflow,
 * including both the category path and the workflow name.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {string} workflowFullPath - The full path string of the workflow.
 */

var workflowId = workflow.currentWorkflow.id;
var workflowObject = Server.getWorkflowWithId(workflowId);
var categoryObject = workflowObject.workflowCategory;
var workflowFullPath = categoryObject.path + "/" + workflowObject.name;

System.log("Currently executing workflow sequence: " + workflowFullPath);

return workflowFullPath;
