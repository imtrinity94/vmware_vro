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
 * @param {boolean} generateProxyWorkflows
 * @param {number} retryTimeout - [object Object]
 * @return {VCO:RemoteServer} result
 */
var config = new VCOServerConfiguration();

config.host = host;
config.port = port;
config.user = user;
config.password = pass;
config.shared = isShared;
config.connectionTimeout = connectionTimeout;
config.socketTimeout = socketTimeout;
config.retryTimeout = retryTimeout;

result = VCOServerManager.addOrchestrator(config);

if (generateProxyWorkflows) {
  VCOProxyWorkflowManager.createAllProxies(result, true);
}