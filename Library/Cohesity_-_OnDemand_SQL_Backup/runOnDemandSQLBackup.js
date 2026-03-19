/**
 * Runs an OnDemand MSSQL Database backup
 *
 * @param {CS:CohesityConnection} cohesityCluster - [object Object]
 * @param {CS:SourceRootNode} sqlHost - [object Object]
 * @param {Array/CS:Node} aagDatabases - [object Object]
 * @param {Array/CS:Node} standaloneDatabases - [object Object]
 * @param {string} backupType - [object Object]
 * @param {CS:Node} sqlInstance
 */
//Auto generated script, cannot be modified !
System.getModule("com.cohesity.plugin.dev.workflows").runOnDemandSQLBackup(cohesityCluster,sqlHost,sqlInstance,aagDatabases,standaloneDatabases,backupType) ;