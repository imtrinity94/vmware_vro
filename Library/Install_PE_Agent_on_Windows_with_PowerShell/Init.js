/**
 * Init
 *
 * @param {Puppet:Master} puppetMaster - [object Object]
 * @param {string} puppetCodeEnvironment - [object Object]
 * @param {string} puppetNodeCertname - [object Object]
 * @param {SecureString} puppetAutosignSharedSecret - [object Object]
 * @param {string} nodeHostname - [object Object]
 * @param {string} username - [object Object]
 * @param {SecureString} password - [object Object]
 * @param {string} puppetRoleClass - [object Object]
 * @param {string} puppetApptier - [object Object]
 * @param {string} puppetDepartment - [object Object]
 * @param {string} puppetService - [object Object]
 * @param {boolean} useHTTPS
 * @param {string} winRMAuthMethod
 * @return {string} name
 * @return {string} transportProtocol
 * @return {string} auth
 */
name = "temp-puppet-" + nodeHostname + "-" + System.nextUUID();
transportProtocol = useHTTPS ? "HTTPS" : "HTTP";
if (winRMAuthMethod == 'Basic' || winRMAuthMethod == 'Kerberos') {
  auth = winRMAuthMethod;
}
else {
  auth = 'Basic';
}