// Prepare Paramaters

//var method = requestMethod;
var method = "GET";
//var uri = requestUri;
var uri = "https://infoblox.com/wapi/v2.7/ipv4address?_return_fields=fingerprint,names,ip_address&status=USED&network=10.0.0.0/24"
//var body = requestBody;
var body = '';
var requestContentType = "application/json"
var username = "user";
var password = "password"
// Create REST Request

var restHost = RESTHostManager.createHost("dynamicRequest");
restHost.operationTimeout = 600;
httpRestHost = RESTHostManager.createTransientHostFrom(restHost);
httpRestHost.operationTimeout = 600;
httpRestHost.url = uri;

 var request = httpRestHost.createRequest(method, uri, body);

//  Basic authentication:
var authParams = ['Shared Session', username, password];
var authenticationObject = RESTAuthenticationManager.createAuthentication('Basic', authParams);
httpRestHost.authentication = authenticationObject;

 
// Set Content Type
request.contentType = requestContentType;

// Execute REST Request
System.log("REST Request: " + method + " " + request.fullUrl);
var response = request.execute();

// Output Handling
statusCodeAttribute = response.statusCode;
System.log("REST Response Status Code: " + statusCodeAttribute);
responseAsString = response.contentAsString;
System.log("REST Response Content: " + responseAsString);
