/**
 * Delete CA certificate
 *
 * @param {Configurator:CA} cert
 * @return {string} error
 */
auth = Config.getKeystores();
ld = auth.getDeleteCAAction();
model = ld.getModel();
model.value = cert.getId();
error=ld.execute();