/**
 * Validate connection information.
 *
 * @param {boolean} enabled
 * @param {string} host
 * @param {number} port
 * @param {string} path
 * @param {string} userName
 * @param {SecureString} password
 * @param {string} pbmUrl
 * @param {string} smsUrl
 */
if (enabled) {
    VcPlugin.validateConnection(host , port , path , userName , password);

    if (pbmUrl && pbmUrl.trim()) {
       VcPlugin.validatePbmServiceAvailability(pbmUrl);
    }

    if (smsUrl && smsUrl.trim()) {
        VcPlugin.validateSmsServiceAvailability(smsUrl);
    }
}

 