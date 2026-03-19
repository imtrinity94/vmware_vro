/**
 * Scriptable task
 *
 * @param {string} xsdname
 * @param {string} namespace
 * @param {boolean} generateWorkflowStubs
 * @param {WorkflowCategory} workflowStubsCategory
 */
DynamicTypesManager.importTypesFromXSD(xsdname, namespace, generateWorkflowStubs ? workflowStubsCategory : null);