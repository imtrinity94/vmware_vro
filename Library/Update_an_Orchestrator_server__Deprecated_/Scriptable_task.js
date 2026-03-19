/**
 * Scriptable task
 *
 * @param {VCO:RemoteServer} server
 * @param {string} host
 * @param {number} port
 * @param {string} user
 * @param {SecureString} pass
 * @param {boolean} isShared
 * @param {number} connectionTimeout
 * @param {number} socketTimeout
 * @param {boolean} ssoEnabled
 * @param {string} ssoHost
 * @param {string} ssoScheme
 * @param {number} ssoPort
 * @param {boolean} ssoSameAsVco
 * @param {number} retryTimeout - [object Object]
 * @return {VCO:RemoteServer} result
 */
result = VCOServerManager.updateServer(server, host, port, isShared, user, pass, connectionTimeout, socketTimeout, retryTimeout, ssoEnabled, ssoScheme, ssoHost, ssoPort, ssoSameAsVco);