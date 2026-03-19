/**
 * Create a new storage domain
 *
 * @param {CS:CohesityConnection} connection - [object Object]
 * @param {CS:ClusterPartition} clusterPartition - [object Object]
 * @param {string} name - [object Object]
 * @param {boolean} deduplicationEnabled - [object Object]
 * @param {boolean} inlineDeduplicate - [object Object]
 * @param {boolean} compressionEnabled - [object Object]
 * @param {boolean} inlineCompress - [object Object]
 * @param {boolean} encryptionEnabled - [object Object]
 * @return {CS:ViewBox} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.others").createStorageDomain(connection,clusterPartition,name,deduplicationEnabled,inlineDeduplicate,compressionEnabled,inlineCompress,encryptionEnabled) ;