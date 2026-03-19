/**
 * @description Retrieves the email address and other LDAP attributes of the currently logged-in
 *              vRO user by looking up their account in Active Directory.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

requesterLogin = Server.getCurrentLdapUser().loginName;
targetUser = ActiveDirectory.searchExactMatch("User", requesterLogin);
System.log(targetUser[0].getAttribute("mail")); // Main line of Code

System.log(targetUser[0].accountName);
System.log(targetUser[0].distinguishedName);
System.log(targetUser[0].id);
System.log(targetUser[0].userPrincipalName);
for each (i in targetUser[0].allAttributes) System.log(i);
