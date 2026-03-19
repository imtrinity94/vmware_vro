/**
 * Setup PS inputs
 *
 * @param {string} nodeHostname
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