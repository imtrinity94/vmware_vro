/**
 * updateSOAPHost
 *
 * @param {string} newName
 * @param {string} newWsdlUri
 * @param {number} newConnectionTimeout
 * @param {number} newRequestTimeout
 * @param {string} newAuthenticationType
 * @param {string} newUsername
 * @param {string} newSessionMode
 * @param {SecureString} newPassword
 * @param {string} newWorkstation
 * @param {string} newDomain
 * @param {string} id
 * @param {string} spn
 * @return {SOAP:Host} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.soap.configuration").updateSOAPHost(id,newName,newWsdlUri,newConnectionTimeout,newRequestTimeout,newAuthenticationType,newSessionMode,newUsername,newPassword,newDomain,newWorkstation,spn) ;