/**
 * validateRequest
 *
 * @param {vCACCAFE:Tenant} vraTenant - [object Object]
 * @param {CS:CohesityConnection} cohesityCluster - [object Object]
 */
if (!cohesityCluster) {
	throw "[Missing Param] Cluster config not provided";
}

if (cohesityCluster.connectionType !== "ADMIN") {
	throw "Invalid connectionType for the configuration."; 
}

if (!vraTenant) {
	throw "[Missing Param] VRA Tenant instance not provided.";
}