/**
 * add certificates
 *
 * @param {Configurator:Keystore} keystore
 * @param {string} alias
 * @param {string} certificates
 */
var action = keystore.getAddCertificateToKeystoreAction();


action.setModel(certificates, alias);

var msg = action.validate();

if (msg) {
    throw msg;
} 

msg =  action.execute();
if (msg) {
    throw msg;
} 

