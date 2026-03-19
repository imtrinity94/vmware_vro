/**
 * Restore MSSQL databases
 *
 * @param {CS:CohesityConnection} cohesityCluster - [object Object]
 * @param {CS:ObjectResource} backupCandidate - [object Object]
 * @param {CS:ProtectionJobNameResource} protectionJobNameResource - [object Object]
 * @param {boolean} pointInTimeRecovery - [object Object]
 * @param {Date} restoreTime - [object Object]
 * @param {CS:SnapshotVersion} snapshotVersion - [object Object]
 * @param {boolean} restoreToOrignalInstance - [object Object]
 * @param {CS:SourceRootNode} alternateSQLHost - [object Object]
 * @param {CS:Node} alternateSQLInstance - [object Object]
 * @param {boolean} overwriteOrigDatabase - [object Object]
 * @param {string} logFileDestination - [object Object]
 * @param {string} altDatabaseName - [object Object]
 * @param {boolean} withRecovery - [object Object]
 * @param {boolean} keepCdc - [object Object]
 * @param {boolean} taillogs - [object Object]
 * @param {boolean} overwriteAlternateDatabase
 * @param {string} targetDataFilesDirectory
 */
//Auto generated script, cannot be modified !
System.getModule("com.cohesity.plugin.dev.workflows").restoreMSSQLDatabase(cohesityCluster,backupCandidate,protectionJobNameResource,pointInTimeRecovery,restoreTime,snapshotVersion,restoreToOrignalInstance,alternateSQLHost,alternateSQLInstance,overwriteOrigDatabase,logFileDestination,altDatabaseName,withRecovery,keepCdc,taillogs,targetDataFilesDirectory,overwriteAlternateDatabase) ;