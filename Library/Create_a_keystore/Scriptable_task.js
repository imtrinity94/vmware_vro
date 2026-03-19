/**
 * Scriptable task
 *
 * @param {string} name
 */
var action = Config.getKeystores().getCreateKeystoreAction();

var ks = new ConfiguratorKeystore(null, name) ;

action.setModel(ks);

var msg = action.validate();

if(msg) {
	throw msg;
}

msg =  action.execute();
if (msg) {
    throw msg;
} 