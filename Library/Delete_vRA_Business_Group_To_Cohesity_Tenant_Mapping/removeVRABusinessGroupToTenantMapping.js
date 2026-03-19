/**
 * Removes the configuration for mapping between vRA business group and cohesity tenant. This does not delete any tenant data on cohesity side.
 *
 * @param {CS:CohesityConnection} cohesityCluster - [object Object]
 * @param {string} vRATenantId - [object Object]
 * @param {string} vRABusinessGroup - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.cohesity.plugin.dev.workflows").removeVRABusinessGroupToTenantMapping(cohesityCluster,vRATenantId,vRABusinessGroup) ;