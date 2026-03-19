/**
 * @description Retrieves and logs the full folder path of the currently executing workflow,
 *              including both the category path and the workflow name.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

var id = workflow.currentWorkflow.id;
var wfInstance = Server.getWorkflowWithId(id);
var catObj = wfInstance.workflowCategory;
System.log(catObj.path + "/" + wfInstance.name);
