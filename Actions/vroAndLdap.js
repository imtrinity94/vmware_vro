/**
 * Retrieves all Organizational Units (OUs) from an Active Directory host.
 * Supports paging for large environments and optional regex filtering on distinguishedName.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {AD:AdHost} adHostObj - The Active Directory host object.
 * @param {string} [dnFilterRegexStr] - Optional regex pattern to filter OUs by distinguishedName.
 * @returns {LdapEntry[]} allLdapResultsArray - Array of LDAP entries for the matching OUs.
 */

if (!adHostObj) {
    throw "Active Directory Host object is mandatory for LDAP operations.";
}

var adLdapClient = adHostObj.getLdapClient();
var adBaseDn = adHostObj.hostConfiguration.ldapBase;

// Define specific attribute retrieval to optimize LDAP bandwidth
var attributeSelectionList = ["distinguishedName"];  

var ldapSearchRequestObj = LdapSearchRequest.createRequest(    
    adBaseDn,  
    "(objectClass=organizationalUnit)",  
    LdapSearchScope.SUB,    
    attributeSelectionList,  
    LdapDereferencePolicy.ALWAYS
);    
    
var pagedResultsCookie = null;  
var allLdapResultsArray = [];  
var safetyIterationCount = 0;  
var PAGE_SIZE_LIMIT = 1000;
var MAX_TOTAL_ITERATIONS = 1000;

System.log("Initiating recursive Paged LDAP Search under: " + adBaseDn);

while (safetyIterationCount < MAX_TOTAL_ITERATIONS) {  
    safetyIterationCount++;  
      
    var pagedControlConfig = new LdapSimplePagedResultsControl(PAGE_SIZE_LIMIT, pagedResultsCookie, true);  
    
    // Manage duplicate controls before insertion
    ldapSearchRequestObj.removeControlByOid(pagedControlConfig.getOID());    
    ldapSearchRequestObj.addControl(pagedControlConfig);   
      
    var searchResponseObj = adLdapClient.searchBySearchRequest(ldapSearchRequestObj);    
    var currentBatchEntries = searchResponseObj.getSearchEntries();  
  
    if (currentBatchEntries) {  
        var i;
        for (i = 0; i < currentBatchEntries.length; i++) {
            allLdapResultsArray.push(currentBatchEntries[i]);
        }
    }  
      
    var serverResponseControl = LdapSimplePagedResultsControl.get(searchResponseObj);  
    if (serverResponseControl && serverResponseControl.moreResultsToReturn()) {  
        pagedResultsCookie = serverResponseControl.getCookieBytes();  
    } else {  
        break;  
    }  
}   

if (allLdapResultsArray.length === 0) {  
    System.warn("Search completed: No Organizational Units found under " + adBaseDn);
    return [];
}

System.log("LDAP Discovery complete. Total OUs found: " + allLdapResultsArray.length);

// Post-processing: Application of Regex Filter
if (dnFilterRegexStr) {  
    System.log("Applying DN filtering with pattern: " + dnFilterRegexStr);
    var filterRegex = new RegExp(dnFilterRegexStr, "gi");  
    
    allLdapResultsArray = allLdapResultsArray.filter(function (entryItem) { 
        var entryDnValue = entryItem.getAttributeValue("distinguishedName");
        return entryDnValue && entryDnValue.match(filterRegex); 
    });
    
    System.log("Filter Result: " + allLdapResultsArray.length + " OUs remaining.");
}  

// Diagnostic logging of discovered DNs
var j;
for (j = 0; j < allLdapResultsArray.length; j++) {
    var finalOuEntry = allLdapResultsArray[j];
    System.debug("Discovered OU -> DN: " + finalOuEntry.getDN());
}

return allLdapResultsArray;
