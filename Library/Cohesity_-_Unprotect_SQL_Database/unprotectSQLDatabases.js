/**
 * Runs an OnDemand MSSQL Database backup
 *
 * @param {CS:CohesityConnection} cohesityCluster - [object Object]
 * @param {CS:SourceRootNode} sqlHost - [object Object]
 * @param {CS:Node} sqlInstance - [object Object]
 * @param {Array/CS:Node} aagDatabases - [object Object]
 * @param {Array/CS:Node} standaloneDatabases - [object Object]
 * @param {boolean} unprotectEntireObjects
 */
//Auto generated script, cannot be modified !
System.getModule("com.cohesity.plugin.dev.workflows").unprotectSQLDatabases(cohesityCluster,sqlHost,sqlInstance,aagDatabases,standaloneDatabases,unprotectEntireObjects) ;