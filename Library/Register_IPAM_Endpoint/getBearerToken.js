/**
 * Get bearer token for vRA REST authentication
 *
 * @param {REST:RESTHost} restHost
 * @param {string} userName
 * @param {SecureString} password
 * @param {string} tenant
 * @return {string} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vra.rest").getBearerToken(restHost,userName,password,tenant) ;