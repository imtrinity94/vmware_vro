/**
 * Register a new UDA source with Cohesity
 *
 * @param {CS:CohesityConnection} cohesityCluster - [object Object]
 * @param {string} sourceType - [object Object]
 * @param {Array/string} hosts - [object Object]
 * @param {string} scriptDir - [object Object]
 * @param {string} credentials_username - [object Object]
 * @param {SecureString} credentials_password - [object Object]
 * @param {boolean} mountView - [object Object]
 * @param {string} viewParams_mountDir - [object Object]
 * @param {string} sourceRegistrationArgs - [object Object]
 */
//Auto generated script, cannot be modified !
System.getModule("com.cohesity.plugin.dev.workflows").registerNewUDASourceWorkflow(cohesityCluster,sourceType,hosts,scriptDir,credentials_username,credentials_password,mountView,viewParams_mountDir,sourceRegistrationArgs) ;