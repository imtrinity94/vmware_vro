/**
 * Retrieves all Organizational Units (OUs) from an Active Directory host.
 * Supports paging for large environments and optional regex filtering on distinguishedName.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {AD:AdHost} adHost The Active Directory host object.
 * @param {string} [distinguishedName] Optional regex pattern to filter OUs.
 * @returns {LdapEntry[]} Array of LDAP entries for the matching OUs.
 */

if (!adHost) {
    throw "No AD Host provided";
}

var ldapClient = adHost.getLdapClient();
var rootBaseDn = adHost.hostConfiguration.ldapBase;

// Return only distinguishedName from the LDAP lookup
var propertyList = ["distinguishedName"];  

var searchRequest = LdapSearchRequest.createRequest(    
    rootBaseDn,  
    "(objectClass=organizationalUnit)",  
    LdapSearchScope.SUB,    
    propertyList,  
    LdapDereferencePolicy.ALWAYS
);    
    
var resumeCookie = null;  
var allResults = [];  
var iterations = 0;  

while (iterations < 1000) {  
    iterations++;  
      
    var pagedSearchControl = new LdapSimplePagedResultsControl(1000, resumeCookie, true);  
    // Make sure there is no other control registered with same OID    
    searchRequest.removeControlByOid(pagedSearchControl.getOID());    
    // add SimplePagedResultsControl to current search control    
    searchRequest.addControl(pagedSearchControl);   
      
    var searchResult = ldapClient.searchBySearchRequest(searchRequest);    
    var ldapEntries = searchResult.getSearchEntries();  
  
    if (ldapEntries) {  
        for each (var entry in ldapEntries) {
            allResults.push(entry);
        }
    }  
      
    var responseControl = LdapSimplePagedResultsControl.get(searchResult);  
    if (responseControl && responseControl.moreResultsToReturn()) {  
        resumeCookie = responseControl.getCookieBytes();  
    } else {  
        break;  
    }  
}   

if (allResults.length > 0) {  
    // Filter by distinguishedName, if provided
    if (distinguishedName) {  
        var regx = new RegExp(distinguishedName, "gi");  
        allResults = allResults.filter(function (elem) { 
            return elem.getAttributeValue("distinguishedName").match(regx); 
        });
    }  

    for each (var organizationUnit in allResults) {
        var organizationUnitDn = organizationUnit.getDN();
        System.debug('Found OU DN: ' + organizationUnitDn);
    }
} else {  
    throw "No LDAP entries found in " + rootBaseDn + "!";  
}

return allResults;
