/**
 * Create a random LOCAL (ORGUser) user and add user to the tenant.
 *
 * @param {CS:CohesityConnection} cluster - [object Object]
 * @param {CS:Tenant} csTenant - [object Object]
 * @return {CS:CohesityConnection} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.mt").addNewUserToTenant(cluster,csTenant) ;