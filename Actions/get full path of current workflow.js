var id = workflow.currentWorkflow.id;
var wfInstance = Server.getWorkflowWithId(id);
var catObj = wfInstance.workflowCategory;
System.log(catObj.path + "/" + wfInstance.name);
