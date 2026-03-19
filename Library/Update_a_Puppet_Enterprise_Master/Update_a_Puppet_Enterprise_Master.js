/**
 * Update the master puppet in inventory
 *
 * @param {string} name
 * @param {string} host
 * @param {number} port
 * @param {string} username
 * @param {SecureString} password
 * @param {Puppet:Master} master
 * @param {boolean} useSudo
 * @return {Puppet:Master} updatedMaster
 */
prevName = master.getName();
prevHost = master.getHost();
prevPort = master.getPort();
prevUsername = master.getUsername();
prevPassword = master.getPassword();
prevUseSudo = master.getUseSudo();

updatedMaster = master.update(name, host, port, username, password, useSudo);
//Try to get the product information. This will attempt a connection to the host and report
//an Exception if the Host is invalid.
product = updatedMaster.getProduct();
if (/^(.*Exception:.*)/.test(product)) {
	updatedMaster = master.update(prevName, prevHost, prevPort, prevUsername, prevPassword, prevUseSudo);
	throw "Failed to update Master. Exception: " + product;
}

if(!updatedMaster.isEnterprise()) {
	updatedMaster = master.update(prevName, prevHost, prevPort, prevUsername, prevPassword, prevUseSudo);
	throw "Error updating Master. Host provided is not a Puppet Enterprise Master.";
}