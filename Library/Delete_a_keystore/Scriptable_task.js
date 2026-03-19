/**
 * Scriptable task
 *
 * @param {Configurator:Keystore} keystore
 */
var action = Config.getKeystores().getDeleteKeystoreAction();

action.setModel(keystore);

var msg = action.validate();

if (msg) {
    throw msg;
}

msg =  action.execute();
if (msg) {
    throw msg;
} 