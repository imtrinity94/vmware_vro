/**
 * Wait for Controllers to be ready
 *
 * @param {string} host1
 */

var host1 = createHost(host1);
var op1 = createOp(host1, "GET", "/api/initial-data");
var urlParamValues = "";


// Execute request Controller 1
var request1 = setRequest(op1);
var response1 = request1.execute();

//Process response Controller 1
var responseString1 = parseResponse(response1);
var statusCode1 = response1.statusCode;



// Wait for Controller 1 to be ready
while (true) {
	if (statusCode1 == "200") {
        System.log("Controller 1 is up and Ready to be configured.")
		break;
	}
		// Execute request
		var request1 = setRequest(op1);
		var response1 = request1.execute();

		//Process response
		var responseString1 = parseResponse(response1);
		var statusCode1 = response1.statusCode;
		System.sleep(3000);
}



// Create a transient RESTHost
function createHost(url) {
	System.log("Creating transient REST host with base URL: " + url);
	
	var host = new RESTHost(url);
	host.name = generateNameFromUrl(url);
	host.url = url;
	host.hostVerification = false;
	host.proxyHost = null;
	host.proxyPort = 0;

	
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
	
	op = RESTHostManager.createTransientOperationFrom(op);
	
	return op;
}


// Prepare the RESTRequest object for executing the RESTOperation
function setRequest(op) {
	var request = op.createRequest();
	
	return request;
}

// Parse the RESTResponse object returned from executing a RESTOperation
function parseResponse(response) {
	var statusCode = response.statusCode;
	System.log("Status code: " + statusCode);
	
	var headers = response.getAllHeaders();
	for each (var headerKey in headers.keys) {
	}
	
	var contentAsString = response.contentAsString;
	

}