/**
 * Extract vRA Tenant Details
 *
 * @param {vCACCAFE:Tenant} vraTenant - [object Object]
 * @return {string} vRATenantName
 * @return {string} vRATenantId
 */
// vRA Tenant ID
var vRATenantId = vraTenant.getId();
System.log("vRATenantId is " + vRATenantId);

// vRA Tenant Name
var vRATenantName = vraTenant.getName();
System.log("vRATenantName is " + vRATenantName);