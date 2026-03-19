/**
 * Register vCenter Server instance
 *
 * @param {boolean} enabled
 * @param {string} host
 * @param {number} port
 * @param {string} path
 * @param {boolean} sessionPerUser
 * @param {string} userName
 * @param {SecureString} password
 * @param {string} domain
 * @param {string} pbmUrl
 * @param {string} smsUrl
 * @return {VC:SdkConnection} newInstance
 */
newInstance = VcPlugin.registerVCenterServerInstance(enabled, host, port, path, sessionPerUser, userName, password, domain, pbmUrl, smsUrl);