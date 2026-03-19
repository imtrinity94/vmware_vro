/**
 * Preapare output
 *
 * @param {Workflow} createWorkflow
 * @param {Workflow} readWorkflow
 * @param {Workflow} updateWorkflow
 * @param {Workflow} deleteWorkflow
 * @return {Array/Workflow} actionResult
 */
actionResult = new Array(4);
actionResult[0] = createWorkflow;
actionResult[1] = readWorkflow;
actionResult[2] = updateWorkflow;
actionResult[3] = deleteWorkflow;