/**
 * Scriptable task
 *
 * @param {Configurator:Keystore} keystore
 * @param {string} alias
 */
var action = keystore.getDeleteEntryFromKeystoreAction();


action.setModel(alias);

var msg = action.validate();

if (msg) {
    throw msg;
}

msg =  action.execute();
if (msg) {
    throw msg;
} 