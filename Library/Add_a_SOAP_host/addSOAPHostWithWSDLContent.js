/**
 * Adds a SOAPHost object to the plug-in's repository.
 *
 * @param {string} name - [object Object]
 * @param {string} wsdlContent - [object Object]
 * @param {number} connectionTimeout - [object Object]
 * @param {number} requestTimeout - [object Object]
 * @param {string} authenticationType - [object Object]
 * @param {string} sessionMode - [object Object]
 * @param {string} username - [object Object]
 * @param {SecureString} password - [object Object]
 * @param {string} domain - [object Object]
 * @param {string} workstation - [object Object]
 * @param {string} spn - [object Object]
 * @param {string} proxyHost - [object Object]
 * @param {number} proxyPort - [object Object]
 * @return {SOAP:Host} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.library.soap.configuration").addSOAPHostWithWSDLContent(name,wsdlContent,connectionTimeout,requestTimeout,authenticationType,sessionMode,username,password,domain,workstation,spn,proxyHost,proxyPort) ;