/**
 * Deploy a workflow
 *
 * @param {Workflow} source
 * @param {Array/VCO:RemoteServer} servers
 * @param {path} path
 * @param {boolean} override
 * @return {Array/string} errors
 */
var errors = new Array()
for(var serverIdx in servers) {
	var rmtServer = servers[serverIdx];
	try {
		VCODeploymentManager.deployWorkflow(rmtServer, source, path, override);
		System.log("Imported " + source.name + " on server " + servers[serverIdx].host);
	}  catch ( e ) {
		errors.push(e.message);
		System.error(e.message);
	}
}
