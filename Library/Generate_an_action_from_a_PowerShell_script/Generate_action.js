/**
 * Generate action
 *
 * @param {string} script
 * @param {Module} module
 * @param {string} actionName
 * @param {boolean} generateWorkflow
 * @param {WorkflowCategory} library
 */
if (!module || module == "notfound" ) {
	throw "Invalid module.";
}

PowerShellActionGenerator.createActionForScript(actionName, script, module.name, generateWorkflow,library);
System.log("Action " + module.name +'.' + actionName + " successfully created.")
