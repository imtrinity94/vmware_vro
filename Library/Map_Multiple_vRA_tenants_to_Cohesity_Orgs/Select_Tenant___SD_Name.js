/**
 * Select Tenant & SD Name
 *
 * @param {Array/vCACCAFE:Tenant} vraTenants - [object Object]
 * @param {string} sd_name - [object Object]
 * @return {vCACCAFE:Tenant} vRATenant
 * @return {string} formattedSDName
 * @return {Array/vCACCAFE:Tenant} iTenants
 */
vRATenant = vraTenants.pop();
iTenants = vraTenants;
if (!vRATenant) {
	throw "Invalid input param. No vRATenant found.";	
}
System.log("Mapping vRATenant " + vRATenant.getName() + "...");

formattedSDName = sd_name + "-" + vRATenant.getId().replace(/[^a-zA-Z0-9]/g, "");
System.log("Storage domain name: " + formattedSDName);