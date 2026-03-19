/**
 * Generate action
 *
 * @param {string} name
 * @param {Module} module
 * @param {VCO:RemoteWorkflow} remoteWorkflow
 * @param {Workflow} localWorkflow
 * @param {boolean} isRemote
 */
if (!module || module == "notfound" ) {
	throw "Invalid module.";
}

if(isRemote) {
	VCOProxyWorkflowManager.createProxyActionForRemote(name, module.name, remoteWorkflow);
} else {
	VCOProxyWorkflowManager.createProxyActionForLocal(name, module.name, localWorkflow);
}
