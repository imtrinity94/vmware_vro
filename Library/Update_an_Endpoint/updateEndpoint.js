/**
 * Updates the specified Endpoint from the plug-in's repository.
 *
 * @param {string} name
 * @param {string} cspUri
 * @param {string} cloudApiUri
 * @param {string} refreshToken
 * @param {string} currentName
 * @return {Cloud:Endpoint} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.cloudservices.configuration").updateEndpoint(currentName,name,cspUri,cloudApiUri,refreshToken) ;