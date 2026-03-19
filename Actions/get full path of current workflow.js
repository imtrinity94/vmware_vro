/**
 * Retrieves and logs the full inventory folder path of the currently executing workflow,
 * including both the category path and the workflow name.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {string} The full path string of the workflow.
 */

var id = workflow.currentWorkflow.id;
var wfInstance = Server.getWorkflowWithId(id);
var catObj = wfInstance.workflowCategory;
var fullPath = catObj.path + "/" + wfInstance.name;

System.log("Current Workflow Path: " + fullPath);

return fullPath;
