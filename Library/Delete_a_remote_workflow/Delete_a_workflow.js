/**
 * Delete a workflow
 *
 * @param {VCO:RemoteWorkflow} rmtWorkflow
 * @param {boolean} force
 * @return {Array/string} errors
 */
var errors = new Array()
var impStatusList = null;
try {
	VCODeploymentManager.deleteWorkflow(rmtWorkflow, force)
} catch (e) {
	errors.push(e.message);
	System.error(e.message)
}