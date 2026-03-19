/**
 * Import certificate
 *
 * @param {string} cer
 * @param {string} proxyHost
 * @param {number} proxyPort
 * @return {string} error
 */
var ld = Config.getKeystores().getImportCAFromUrlAction();
var model = ld.getModel();
model.value = cer;
var proxyHostHolder = ld.getProxyHost();
proxyHostHolder.value = proxyHost;
var proxyPortHolder = ld.getProxyPort();
proxyPortHolder.value = proxyPort+"";
error = ld.execute();