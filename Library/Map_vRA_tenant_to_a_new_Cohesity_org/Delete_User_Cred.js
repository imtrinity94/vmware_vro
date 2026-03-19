/**
 * Delete User Cred
 *
 * @param {CS:CohesityConnection} tenantUserConfiguration
 * @param {CS:CohesityConnection} cohesityCluster - [object Object]
 */
if (tenantUserConfiguration) {
	try {
		// Delete the OrgServiceUser - use impersonation to delete.
		System.getModule("com.cohesity.plugin.mt").deleteLocalUser(
			cohesityCluster,
			tenantUserConfiguration.userName
		);
	} catch(err) {
		System.error("Failed to delete the tenant service user. " + err);
	}
	
	System.getModule("com.cohesity.plugin.configuration").removeCohesityEndpoint(tenantUserConfiguration);
}