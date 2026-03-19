/**
 * Delete package
 *
 * @param {boolean} keepShared
 * @param {VCO:RemotePackage} pckg
 * @return {Array/string} errors
 */
var errors = new Array()
System.log("==== Deleting package [" + pckg.getName() +"] ====" );
try {
	VCODeploymentManager.deletePackageWithContent(pckg, keepShared)
	System.log("-- DELETED" );
} catch (e)
{
	errors.push("-- FAILED" );
	System.error("-- FAILED" );

	errors.push("Error: " + e.message);
	System.error("Error: " + e.message);
}
	