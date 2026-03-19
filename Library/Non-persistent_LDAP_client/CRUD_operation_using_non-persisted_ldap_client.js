/**
 * CRUD operation using non-persisted ldap client
 *
 * @param {string} host
 * @param {number} port
 * @param {string} username
 * @param {SecureString} password
 * @param {string} baseDN
 * @param {string} testEntryName
 */
	var ldapClient = null; 
	try {
        ldapClient = LdapClientFactory.newLdapClient(host, port, username, password, false);
        // Create  Test Entry
        entryCN = testEntryName;
        dn = "cn=" + entryCN + "," + baseDN
        entry = new LdapEntry([
             ("dn: " + dn).toString(),
             "objectClass: top",
             "objectClass: person",
             "objectClass: organizationalPerson",
             ("cn: " + entryCN).toString()]);
		System.log("---------------------------------");
		System.log("Trying to create entry with dn[" + dn + "] and cn [" +entryCN +"] under base entry with dn["+baseDN +"]");
        addResult = ldapClient.addEntry(entry);
        entry = ldapClient.getEntry(dn);
		System.log("Ldap entry " + dn + " added " + addResult.getResultString());
		System.log(entry);

        // create Attribute
		System.log("---------------------------------");
		System.log("Add attribute 'postalAddress' with value " + "'Sofia'");
        addAttrValueReq = new LdapModification(LdapModificationType.REPLACE, "postalAddress", "Sofia");
        ldapClient.modify(dn, [addAttrValueReq])

        entry = ldapClient.getEntry(dn);
        value = entry.getAttributeValue("postalAddress");
		System.log(entry.getDN() + " 'postalAddress value set to " + value);

        // Update Attribute value
		System.log("---------------------------------");
		System.log("Update attribute 'postalAddress' value  " + value);
        replaceAttrValueReq = new LdapModification(LdapModificationType.REPLACE, "postalAddress", "Sofia, G.M Dimitrov");
        ldapClient.modify(dn, [replaceAttrValueReq])

        entry = ldapClient.getEntry(dn);
        value = entry.getAttributeValue("postalAddress");
		System.log(entry.getDN() + " 'postalAddress value chnaged to " + value);

        // Delete Attribute value
		System.log("---------------------------------");
		System.log("Delete attribute 'postalAddress' ");
        delAttrValue = new LdapModification(LdapModificationType.DELETE, "postalAddress");
        ldapClient.modify(dn, [delAttrValue])
		System.log(entry.getDN() + " 'postalAddress value removed");

        entry = ldapClient.getEntry(dn);
        value = entry.getAttributeValue("Address");
		System.log(entry.getDN() + " removed 'postalAddress' value" + value );


        // Delete the entry
		System.log("---------------------------------");
		System.log("Delete entry [" + dn +"]!");
        deleteResult = ldapClient.delete(entry.getDN());
        entry = ldapClient.getEntry(dn);
		System.log("Entry with DN[" + dn +"] deleted!");
	} finally {
		if (ldapClient != null){
			ldapClient.close();
		}
	}