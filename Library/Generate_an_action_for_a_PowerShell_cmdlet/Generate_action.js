/**
 * Generate action
 *
 * @param {Module} module
 * @param {string} actionName
 * @param {PowerShell:PowerShellCmdlet} cmdlet
 * @param {string} parameterSetName
 * @param {boolean} generateWorkflow
 * @param {WorkflowCategory} workflowCategory
 * @param {string} parameterSetDefinition - [object Object]
 */
if (!module || module == "notfound" ) {
	throw "Invalid module.";
}

PowerShellActionGenerator.createActionForCmdlet(cmdlet, parameterSetName, actionName, module.name, generateWorkflow, workflowCategory);
System.log("Action " + module.name +'.' + actionName + " successfully created.")
