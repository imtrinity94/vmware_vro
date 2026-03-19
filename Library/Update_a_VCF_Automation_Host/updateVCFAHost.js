/**
 * Add a note to the workflow schema.
 *
 * @param {VCFA:Host} vcfaHost
 * @param {string} hostName
 * @param {string} url
 * @param {string} organization
 * @param {string} sessionType
 * @param {SecureString} vcfaApiToken
 * @param {string} apiVersion
 * @return {VCFA:Host} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.vcfa").updateVCFAHost(vcfaHost,hostName,url,organization,sessionType,vcfaApiToken,apiVersion);
