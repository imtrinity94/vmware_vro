/**
 * Add host
 *
 * @param {string} host
 * @param {number} port
 * @param {string} user
 * @param {SecureString} pass
 * @param {boolean} isShared
 * @param {number} connectionTimeout
 * @param {number} socketTimeout
 * @param {boolean} ssoEnabled
 * @param {string} ssoHost
 * @param {number} ssoPort
 * @param {string} ssoScheme
 * @param {boolean} ssoSameAsVco
 * @param {boolean} generateProxyWorkflows
 * @param {number} retryTimeout - [object Object]
 * @return {VCO:RemoteServer} result
 */
result = VCOServerManager.addServer(host, port, isShared, user, pass, connectionTimeout, socketTimeout, retryTimeout, ssoEnabled, ssoScheme, ssoHost, ssoPort, ssoSameAsVco);

if (generateProxyWorkflows) {
  VCOProxyWorkflowManager.createAllProxies(result, true);
}