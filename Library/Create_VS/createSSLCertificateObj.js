/**
 * createSSLCertificateObj
 *
 * @param {string} SSLAlgorithm - [object Object]
 * @param {string} CommonName - [object Object]
 * @param {string} RSAKeySize - [object Object]
 * @param {string} ECKeySize - [object Object]
 * @param {boolean} certificateBase - [object Object]
 * @param {string} CertName
 * @param {string} state
 * @param {string} organization
 * @param {string} country
 * @param {string} emailAddress
 * @param {string} organizationUnit
 * @param {string} locality
 * @param {string} distinguishedName
 * @param {Avi:WorkflowRuntime} workflowRuntime
 * @param {string} Tenant - [object Object]
 * @return {Avi:WorkflowRuntime} actionResult
 */
//Auto generated script, cannot be modified !
actionResult = System.getModule("com.vmware.avi").createSSLCertificateObj(workflowRuntime,SSLAlgorithm,CommonName,RSAKeySize,ECKeySize,certificateBase,CertName,emailAddress,organizationUnit,organization,locality,state,country,distinguishedName) ;