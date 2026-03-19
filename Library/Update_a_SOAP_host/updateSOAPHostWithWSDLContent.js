/**
 * Updates the specified SOAP host from the plug-in's inventory.
 *
 * @param {string} newName
 * @param {string} wsdlContent
 * @param {number} newConnectionTimeout
 * @param {number} newRequestTimeout
 * @param {string} newAuthenticationType
 * @param {string} newSessionMode
 * @param {string} newUsername
 * @param {SecureString} newPassword
 * @param {string} newWorkstation
 * @param {string} newDomain
 * @param {string} id
 * @param {string} spn
 * @return {SOAP:Host} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.soap.configuration").updateSOAPHostWithWSDLContent(id,newName,wsdlContent,newConnectionTimeout,newRequestTimeout,newAuthenticationType,newSessionMode,newUsername,newPassword,newDomain,newWorkstation,spn) ;