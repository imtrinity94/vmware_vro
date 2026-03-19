/**
 * Import certificate
 *
 * @param {string} cer
 * @param {string} proxyHost
 * @param {number} proxyPort
 * @param {string} proxyUsername - [object Object]
 * @param {SecureString} proxyPassword - [object Object]
 * @return {string} error
 */
var ld = Config.getKeystores().getImportCAFromUrlAction();
var model = ld.getModel();
model.value = cer;
var proxyHostHolder = ld.getProxyHost();
proxyHostHolder.value = proxyHost;
var proxyPortHolder = ld.getProxyPort();
proxyPortHolder.value = proxyPort+"";
var proxyUsernameHolder = ld.getProxyUsername();
proxyUsernameHolder.value = proxyUsername;
var proxyPasswordHolder = ld.getProxyPassword();
proxyPasswordHolder.value = proxyPassword;
error = ld.execute();