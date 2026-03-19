/**
 * Create Account
 *
 * @param {string} name - [object Object]
 * @param {string} accessKey - [object Object]
 * @param {SecureString} secretKey - [object Object]
 * @param {number} connectionTimeout - [object Object]
 * @param {number} socketTimeout - [object Object]
 * @param {number} maxConnections - [object Object]
 * @param {number} maxErrorRetry - [object Object]
 * @param {string} proxyHost - [object Object]
 * @param {number} proxyPort - [object Object]
 * @param {string} proxyUsername - [object Object]
 * @param {SecureString} proxyPassword - [object Object]
 * @param {string} proxyDomain - [object Object]
 * @param {string} proxyWorkstation - [object Object]
 * @return {AWS:AWSAccount} account - [object Object]
 */
account = AWSAwsAccountManager.addAwsAccount({
  name: name,
  accessKey: accessKey,
  secretKey: secretKey,
  connectionTimeout: connectionTimeout,
  socketTimeout: socketTimeout, 
  maxConnections: maxConnections,
  maxErrorRetry: maxErrorRetry,
  proxyHost: proxyHost,
  proxyPort: proxyPort,
  proxyUsername: proxyUsername,
  proxyPassword: proxyPassword,
  proxyDomain: proxyDomain,
  proxyWorkstation: proxyWorkstation
});