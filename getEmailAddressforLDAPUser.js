requesterLogin = Server.getCurrentLdapUser().loginName;    
targetUser = ActiveDirectory.searchExactMatch("User", requesterLogin);    
System.log(targetUser[0].getAttribute("mail"));    //Main line of Code 



System.log(targetUser[0].accountName);   
System.log(targetUser[0].distinguishedName);   
System.log(targetUser[0].id);   
System.log(targetUser[0].userPrincipalName);   
for each (i in targetUser[0].allAttributes) System.log(i);
