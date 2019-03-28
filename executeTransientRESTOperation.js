// VMware vRealize Orchestrator action sample
//
// Executes a transient RESTOperation for a transient RESTHost.
// Performs the operation without having the operation nor the host persist in the RESTHost Inventory.
// Returns the response string and status code as named key-value pairs "responseString" and "statusCode", respectively.
// 
// For vRO 7.0+
//
// Action Inputs:
// baseUrl - string - Base URL for connecting to the RESTful application
// username - string - Optional username for Basic authentication to the REST host
// password - SecureString - Optional password for Basic authentication to the REST host
// opMethod - string - Method of the REST operation
// opUrl - string - URL template of the REST operation including variablized in-line arguments; e.g., /items/{arg1}
// urlParamValues - Array/string - In-line parameter values, if any
// headers - Array/CompsiteType(key:string,value:string) - Optional headers of the request
// contentType - string - Optional content type of the request body (null for GET and DELETE operations)
// content - string - Content of the request body (null for GET and DELETE operations)

//
// Return type: CompsiteType(statusCode:string,responseString:string) - The REST response string and status code as named key-value pairs

// Create transient host and Op
var host = createHost(baseUrl, username, password);
var op = createOp(host, opMethod, opUrl);

// Execute request
var request = setRequest(op, setUrlParamValues(urlParamValues), headers, contentType, content);
var response = request.execute();

//Process response
var responseString = parseResponse(response);
var statusCode = response.statusCode;

return {
  statusCode: statusCode,
  responseString: responseString
};

// Create a transient RESTHost
// If given user/password, uses Basic auth in Shared Session mode
function createHost(url, user, pw) {
	System.log("Creating transient REST host with base URL: " + url);
	
	var host = new RESTHost(url);
	host.name = generateNameFromUrl(url);
	host.url = url;
	host.hostVerification = false;
	host.proxyHost = null;
	host.proxyPort = 0;
	host.authentication = createSharedBasicAuth(user, pw);
	
	host = RESTHostManager.createTransientHostFrom(host);
	
	RESTHostManager.reloadConfiguration();
	
	return host;
}

// Generate a friendly name for a RESTHost or RESTOperation from a given URL,
// removing "HTTP" and "HTTPS", and replacing non-words with '_'
function generateNameFromUrl(url) {
	var name = url;
	name = name.replace(/https:\/\//i, '');
	name = name.replace(/http:\/\//i, '');
	name = name.replace(/\W/g, '_');
	return name;
}

// Instantiate REST Basic authentication in Shared Session mode
function createSharedBasicAuth(user, pw) {
	if (!isSet(user) || !isSet(pw)) {
		return null;
	}
	
	var authParams = ["Shared Session", user, pw];
	var authObject = RESTAuthenticationManager.createAuthentication("Basic", authParams);
	
	System.log("REST host authentication: " + authObject);
	
	return authObject;
}

// Is a given string non-null and not empty?
function isSet(s) {
	return s != null && s != "";
}

// Create a transient RESTOperation
// For POST and PUT, the default content type is application/json
function createOp(host, method, url) {
	var name = generateNameFromUrl(url);
	
	var op = new RESTOperation(name);
	op.method = method;
	op.urlTemplate = url;
	op.host = host;
	
	if (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT") {
		op.defaultContentType = "application/json";
	}
	
	System.debug("Creating operation '" + name + " with URL '" + url + "'");
	System.debug("New operation: " + op);
	
	op = RESTHostManager.createTransientOperationFrom(op);
	
	return op;
}

// If no in-line parameter values are given, return empty array by default
function setUrlParamValues(urlParamValues) {
	return (!urlParamValues) ? [] : urlParamValues;
}

// Prepare the RESTRequest object for executing the RESTOperation
function setRequest(op, urlParamValues, headers, contentType, content) {
	var request = op.createRequest(urlParamValues, content);
	request.contentType = contentType;
	
	for each (var header in headers) {
		request.setHeader(header.key, header.value);
	}
	
	System.debug("Request to execute: " + request);
	System.log("Request URL: " + request.fullUrl);
	
	return request;
}

// Parse the RESTResponse object returned from executing a RESTOperation
function parseResponse(response) {
    const HTTP_ClientError = 404;
	var statusCode = response.statusCode;
	System.log("Status code: " + statusCode);
	
	var headers = response.getAllHeaders();
	for each (var headerKey in headers.keys) {
		System.debug(headerKey + ": " + headers.get(headerKey));
	}
	
	var contentAsString = response.contentAsString;
	System.log("Response content as string: " + contentAsString);
	
	if (statusCode > HTTP_ClientError) {
	    throw "HTTPError: status code: " + statusCode;
	} else {
	    return contentAsString;
	}
}
