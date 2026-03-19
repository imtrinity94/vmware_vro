/**
 * Deploy a workflow
 *
 * @param {VCO:RemoteWorkflow} source
 * @param {Array/VCO:RemoteServer} servers
 * @param {path} path
 * @param {boolean} override
 * @return {Array/string} errors
 */
var errors = new Array();
for(var serverIdx in servers) {
	var rmtServer = servers[serverIdx];

	try {
		VCODeploymentManager.deployRemoteWorkflow(rmtServer, source, path, override);
		System.log("Imported " + source.getName() + " on server " + servers[serverIdx].host)
	}  catch ( e ) {
		errors.push("Error : " + e.message);
		System.error(e.message)
	}
}