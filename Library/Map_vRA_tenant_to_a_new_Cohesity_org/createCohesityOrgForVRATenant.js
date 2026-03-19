/**
 * For a vRA Tenant create a new Cohesity Org.
 *
 * @param {string} vRATenantName - [object Object]
 * @param {string} vRATenantId - [object Object]
 * @param {CS:CohesityConnection} connection - [object Object]
 * @return {CS:Tenant} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.mt").createCohesityOrgForVRATenant(vRATenantName,vRATenantId,connection) ;