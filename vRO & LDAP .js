/*  getAllAdOrganizationalUnits - Filtered on "OU=SRV"

This script retrieves a list of Organizational Units.

ATTRIBUT

  adHost -  Specifies adHost to use

  distinguishedName (string)   - Specifies a regex filter.  Only computers with DNs matching the pattern will be returned. 

   

*/  

  

  

//  Get AD Host to use : 

ldapClient = adHost.getLdapClient();

rootBaseDn = adHost.hostConfiguration.ldapBase;

  

//  Return only distinguishedName from the LDAP lookup : 

var propertyList = [     

  "distinguishedName"  

];  

  

searchRequest = LdapSearchRequest.createRequest(    

  rootBaseDn,  

  "(objectClass=organizationalUnit)",  

  LdapSearchScope.SUB,    

  propertyList,  

  LdapDereferencePolicy.ALWAYS);    

    

resumeCookie = null;  

allResults = [];  

iterations = 0;  

while ( true && iterations < 1000 ){  

    //  Don't let the loop go over 1000 iterations to avoid infinite loop.  

    iterations ++;  

      

      

    pagedSearchControl = new LdapSimplePagedResultsControl(999999, resumeCookie, true);  

    // Make sure there is no another control registered with same OID    

    searchRequest.removeControlByOid(pagedSearchControl.getOID());    

    // add SimplePagedResultsControl to current search control    

    searchRequest.addControl(pagedSearchControl);   

      

      

    searchResult = ldapClient.searchBySearchRequest(searchRequest);    

    ldapEntries = searchResult.getSearchEntries();  

  

    if ( ldapEntries ){  

        ldapEntries.map(function (elem) { allResults.push(elem); });  

      }  

      

    responseControl = LdapSimplePagedResultsControl.get(searchResult);  

      

    if ( responseControl.moreResultsToReturn() ){  

        resumeCookie = responseControl.getCookieBytes();  

      } else {  

        break;  

      }  

}   

  

  

if ( allResults ){  

  //  Filter by distinguishedName, if provided:  

    if ( distinguishedName ){  

    regx = new RegExp(distinguishedName,"gi");  

    allResults = allResults.filter(function (elem) { return elem.getAttributeValue("distinguishedName").match(regx) } );

    }  

      for (keyAR in allResults) {

            organizationUnit = allResults[keyAR];

            organizationUnitDn = organizationUnit.getDN();

            System.debug('organizationUnitDn : ' + organizationUnitDn);

        }

    } else {  

          throw "No LDAP entries found for AD Computers in " + rootBaseDn + "!";  

    }
