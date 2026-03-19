/**
 * Generate workflow
 *
 * @param {REST:RESTOperation} operation
 * @param {string} workflowName
 * @param {WorkflowCategory} category
 * @param {boolean} use_xsd
 * @param {string} namespace
 * @param {string} element
 * @param {string} defaultContentType
 * @return {Workflow} generatedWorkflow
 */
generatedWorkflow = use_xsd ? RESTHostManager.createWorkflowWithXsdInput(operation, workflowName, category, namespace, element, defaultContentType)
                            : RESTHostManager.createWorkflow(operation, workflowName, category, defaultContentType);
