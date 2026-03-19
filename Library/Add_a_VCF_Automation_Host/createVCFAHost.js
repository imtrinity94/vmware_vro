/**
 * Add a note to the workflow schema.
 *
 * @param {string} hostName
 * @param {string} url
 * @param {string} organization
 * @param {string} sessionType
 * @param {SecureString} vcfaApiToken
 * @param {string} apiVersion
 * @param {boolean} persist
 * @return {VCFA:Host} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vcfa").createVCFAHost(hostName,url,organization,sessionType,vcfaApiToken,apiVersion,persist);
