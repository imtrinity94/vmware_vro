/**
 * Generates a workflow from a SOAP operation.
 *
 * @param {SOAP:Host} host - [object Object]
 * @param {string} operationName - [object Object]
 * @param {string} workflowName - [object Object]
 * @param {WorkflowCategory} category - [object Object]
 * @param {Properties} options
 * @return {Workflow} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.soap").generateWorkflowFromSOAPOperation(host,operationName,workflowName,category,options) ;