/**
 * Scriptable task
 *
 * @param {Configurator:Keystore} keystore
 * @param {string} alias
 * @param {string} certificates
 * @param {SecureString} pkPassword
 */
var action = keystore.getAddEntryToKeystoreAction();


action.setModel(certificates, alias, pkPassword);

var msg = action.validate();

if (msg) {
    throw msg;
}

msg =  action.execute();
if (msg) {
    throw msg;
} 