/**
 * lookup entry by DN
 *
 * @param {string} host
 * @param {number} port
 * @param {string} username
 * @param {SecureString} password
 * @param {string} lookupDn
 */
	var ldapClient = null; 
	try {
		System.log("Initializing ldap client...");
        ldapClient = LdapClientFactory.newLdapClient(host, port, username, password, false);
		System.log("Searching for entry with dn ["+ lookupDn +"]");
        entry = ldapClient.getEntry(lookupDn);
		if (entry != null) {
			System.log("Found entry with dn[" + entry.getDN() + "]");
			attrs = entry.getAttributes();
			for ( i in attrs){
				System.log(" name :" + attrs[i].getName());
				System.log(" values :" + attrs[i].getValues());
			}
		} else {
			System.log("Nothing found!!!");
		}
	} finally {
		if (ldapClient != null){
			ldapClient.close();
		}
	}