/**
 * Delete Tenant User Conf
 *
 * @param {CS:CohesityConnection} tenantUserConfiguration
 * @param {CS:CohesityConnection} cohesityCluster - [object Object]
 */
if (tenantUserConfiguration) {
	try {
		// Delete the OrgServiceUser - use impersonate
		System.getModule("com.cohesity.plugin.mt").deleteLocalUser(
			cohesityCluster,
			tenantUserConfiguration.userName
		);
	} catch(err) {
		System.error("Failed to delete the tenant service user. " + err);
	}
	
	try {
		System.getModule("com.cohesity.plugin.configuration").removeCohesityEndpoint(tenantUserConfiguration);
	} catch(err) {
		System.error("Failed to remove endpoint configuration data. " + err);
	}
}