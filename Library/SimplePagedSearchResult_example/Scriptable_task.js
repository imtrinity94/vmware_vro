/**
 * Scriptable task
 *
 * @param {string} host
 * @param {number} port
 * @param {string} username
 * @param {SecureString} password
 * @param {string} baseDn
 */
var ldapClient = LdapClientFactory.newLdapClient(host, port, username, password, false);
// Perform a search to retrieve all users in the server, but only retrieving 2 at a time.
var numSearches = 0;
var totalEntriesReturned = 0;
var searchRequest = LdapSearchRequest.createRequest(
										baseDn,
										"(&(objectCategory=person)(objectClass=organizationalPerson))",
										LdapSearchScope.SUB,
										null, //attributes
										LdapDereferencePolicy.ALWAYS);

var resumeCookie = null;
while (true)
{
	System.log('--------------------------------------------');
	System.log("More results found. Continuing with page " + numSearches)

	// Create SimplePagedResultsControl configured to return at most 2 entries
	// on initiali request resumeCookie must be null
	pagedSearchControl=  new LdapSimplePagedResultsControl(2, resumeCookie,true)
	// Make sure there is no another control registered with same OID
	searchRequest.removeControlByOid(pagedSearchControl.getOID());
	// add SimplePagedResultsControl to current search control
	searchRequest.addControl(pagedSearchControl);

	// execute search request
	var searchResult = ldapClient.searchBySearchRequest(searchRequest);
	numSearches++;
	totalEntriesReturned += searchResult.getEntryCount();

	// Traverse trough result set
	entries = searchResult.getSearchEntries()
	for (var e in  entries)
	{
		System.log(entries[e].getParsedDN().toNormalizedString());
	}
	// Check if htere are more results
	responseControl = LdapSimplePagedResultsControl.get(searchResult);
	if (responseControl.moreResultsToReturn()) {
		// The resume cookie can be included in the simple paged results
		// control included in the next search to get the next page of results.
		resumeCookie = responseControl.getCookieBytes();
	} else {
		break;
	}
}
