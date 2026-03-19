/**
 * Adds puppet master to inventory
 *
 * @param {string} name
 * @param {string} host
 * @param {number} port
 * @param {string} username
 * @param {SecureString} password
 * @param {boolean} useSudo
 * @param {string} errorCode
 * @return {Puppet:Master} master
 * @return {string} errorCode
 * @return {boolean} wipeDuplicates
 */
try{
	master = PuppetMasterManager.addMaster(name, host, port, username, password, useSudo);

	//Try to get the product information. This will attempt a connection to the host and report
	//an Exception if the Host is invalid.
	product = master.getProduct();
	if (/^(.*Exception:.*)/.test(product)) {
		master.remove();
		errorCode += "Failed to add Master. Exception: " + product;
		throw errorCode;
	}
	
	//Checks whether the host provided satisfies the Puppet Enterprise check.
	if (!master.isEnterprise()) {
		master.remove();
		errorCode += "Failed to add Master. Host provided is not a Puppet Enterprise Master.";
		throw errorCode;
	}
} catch(e){
	System.log("Error adding the master " + master + " with error " + e);
	throw(e);
}