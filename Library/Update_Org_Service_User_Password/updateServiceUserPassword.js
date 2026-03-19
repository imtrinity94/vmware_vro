/**
 * Update Org service user password details
 *
 * @param {CS:CohesityConnection} orgServiceConnection - [object Object]
 * @param {SecureString} newPassword - [object Object]
 * @return {CS:CohesityConnection} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.cohesity.plugin.dev.mt").updateServiceUserPassword(orgServiceConnection,newPassword) ;