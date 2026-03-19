/**
 * Start Current wf
 *
 * @param {Workflow} wf
 * @param {Properties} currentParameters
 * @param {number} currentParametersId
 * @return {WorkflowToken} currentToken
 */
System.log("Starting workflow '" + wf.name + "' (" + currentParametersId + ")");
Server.log("Starting workflow '" + wf.name + "' (" + currentParametersId + ")");
currentToken = wf.execute(currentParameters);
