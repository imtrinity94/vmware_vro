/**
 * Validate connection information.
 *
 * @param {string} hostName
 * @param {number} port
 * @param {string} path
 * @param {string} userName
 * @param {SecureString} password
 * @param {boolean} enabled
 * @param {string} pbmUrl
 * @param {string} smsUrl
 */
if (enabled) {
    VcPlugin.validateConnection(hostName , port , path , userName , password);

    if (pbmUrl && pbmUrl.trim()) {
       VcPlugin.validatePbmServiceAvailability(pbmUrl);
    }
 
    if (smsUrl && smsUrl.trim()) {
        VcPlugin.validateSmsServiceAvailability(smsUrl);
    }
}
