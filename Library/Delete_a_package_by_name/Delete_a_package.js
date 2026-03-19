/**
 * Delete a package
 *
 * @param {string} packageName
 * @param {Array/VCO:RemoteServer} servers
 * @param {boolean} keepShared
 * @return {Array/string} errors
 */
var errors = new Array()
System.log("==== Deleting package [" + packageName +"] ====" );
for (var i in servers )
{
	var server = servers[i];
	try {
		VCODeploymentManager.deletePackageWithContentByName(server, packageName, keepShared)
		System.log("-- " + server.host + "-- DELETED" );
	} catch (e)
	{
		errors.push("-- " + server.host + "-- FAILED" );
		System.error("-- " + server.host + "-- FAILED" );

		errors.push("Error: " + e.message);
		System.error("Error: " + e.message);
	}
}