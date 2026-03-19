/**
 * Assign a virtual machine to all cohesity tenants which are mapped against the vRA tenant.
 *
 * @param {CS:CohesityConnection} cohesityCluster - [object Object]
 * @param {string} vRATenantId - [object Object]
 * @param {string} vRABusinessGroup - [object Object]
 * @param {CS:ViewBox} existingStorageDomain - [object Object]
 * @param {CS:ClusterPartition} sd_clusterPartition - [object Object]
 * @param {string} sd_name - [object Object]
 * @param {boolean} sd_deduplicationEnabled - [object Object]
 * @param {boolean} sd_inlineDeduplicate - [object Object]
 * @param {boolean} sd_compressionEnabled - [object Object]
 * @param {boolean} sd_inlineCompress - [object Object]
 * @param {boolean} sd_encryptionEnabled - [object Object]
 * @param {number} sd_numFailuresTolerated - [object Object]
 * @param {number} sd_numNodeFailuresTolerated - [object Object]
 * @param {Array/CS:ProtectionPolicy} protectionPolicies - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.cohesity.plugin.dev.workflows").mapVRABusinessGroupToNewTenant(cohesityCluster,vRATenantId,vRABusinessGroup,existingStorageDomain,sd_clusterPartition,sd_name,sd_deduplicationEnabled,sd_inlineDeduplicate,sd_compressionEnabled,sd_inlineCompress,sd_encryptionEnabled,sd_numFailuresTolerated,sd_numNodeFailuresTolerated,protectionPolicies) ;