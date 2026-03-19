/**
 * Delete Tenant
 *
 * @param {CS:CohesityConnection} cohesityCluster - [object Object]
 * @param {string} csTenantId - [object Object]
 */
if (csTenantId) {
	try {
		System.getModule("com.cohesity.plugin.mt").deleteCohesityOrg(cohesityCluster,csTenantId);
	} catch(err) {
		System.error("Failed to delete tenant account. " + err);
	}
}