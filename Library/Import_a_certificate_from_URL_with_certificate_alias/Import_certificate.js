/**
 * Import certificate
 *
 * @param {string} cer
 * @param {string} certAlias
 * @return {string} error
 */
var ld = Config.getKeystores().getImportCAFromUrlAction();
ld.setCertificateAlias(certAlias)
var model = ld.getModel();
model.value = cer;
error = ld.execute();