/**
 * Retrieves the email address and other LDAP attributes of the currently logged-in
 * vRO user by looking up their account in Active Directory.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {void} Logs the user attributes.
 */

var requesterLogin = Server.getCurrentLdapUser().loginName;
var targetUser = ActiveDirectory.searchExactMatch("User", requesterLogin);

if (targetUser && targetUser.length > 0) {
    var user = targetUser[0];
    System.log("Email: " + user.getAttribute("mail")); // Main line of Code

    System.log("Account Name: " + user.accountName);
    System.log("DN: " + user.distinguishedName);
    System.log("ID: " + user.id);
    System.log("UPN: " + user.userPrincipalName);
    
    for each (var attr in user.allAttributes) {
        System.log(attr);
    }
} else {
    System.warn("User '" + requesterLogin + "' not found in Active Directory search.");
}
