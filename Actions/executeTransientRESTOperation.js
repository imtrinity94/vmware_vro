/**
 * Executes a transient RESTOperation for a transient RESTHost.
 * Performs the operation without persisting the host or operation in the RESTHost inventory.
 * Useful for one-off calls where infrastructure persistence is not desired.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} baseUrl Base URL for connecting to the RESTful application.
 * @param {string} [username] Optional username for Basic authentication.
 * @param {SecureString} [password] Optional password for Basic authentication.
 * @param {string} opMethod Method of the REST operation (GET, POST, etc.).
 * @param {string} opUrl URL template of the REST operation (e.g., /items/{arg1}).
 * @param {string[]} [urlParamValues] In-line parameter values for the URL template.
 * @param {Array} [headers] Optional headers as key-value pairs.
 * @param {string} [contentType] Optional content type for the request body. Defaults to application/json for POST/PUT.
 * @param {string} [content] Content of the request body.
 * @returns {Properties} A Properties object containing "statusCode" and "responseString".
 */

// Create transient host and Op
var host = createHost(baseUrl, username, password);
var op = createOp(host, opMethod, opUrl);

// Execute request
var request = setRequest(op, setUrlParamValues(urlParamValues), headers, contentType, content);
var response = request.execute();

// Process response
var responseString = parseResponse(response);
var statusCode = response.statusCode;

return {
    statusCode: statusCode,
    responseString: responseString
};

/**
 * Creates a transient RESTHost.
 * @private
 */
function createHost(url, user, pw) {
    System.log("Creating transient REST host with base URL: " + url);
    
    var transientHost = new RESTHost(url);
    transientHost.name = generateNameFromUrl(url);
    transientHost.url = url;
    transientHost.hostVerification = false;
    transientHost.proxyHost = null;
    transientHost.proxyPort = 0;
    transientHost.authentication = createSharedBasicAuth(user, pw);
    
    transientHost = RESTHostManager.createTransientHostFrom(transientHost);
    RESTHostManager.reloadConfiguration();
    
    return transientHost;
}

/**
 * Generates a friendly name from a URL.
 * @private
 */
function generateNameFromUrl(url) {
    var name = url;
    name = name.replace(/https:\/\//i, '');
    name = name.replace(/http:\/\//i, '');
    name = name.replace(/\W/g, '_');
    return name;
}

/**
 * Creates Shared Session Basic Authentication.
 * @private
 */
function createSharedBasicAuth(user, pw) {
    if (!isSet(user) || !isSet(pw)) {
        return null;
    }
    
    var authParams = ["Shared Session", user, pw];
    var authObject = RESTAuthenticationManager.createAuthentication("Basic", authParams);
    
    System.log("REST host authentication: " + authObject);
    return authObject;
}

/**
 * Checks if a string is non-null and not empty.
 * @private
 */
function isSet(s) {
    return s != null && s != "";
}

/**
 * Creates a transient RESTOperation.
 * @private
 */
function createOp(host, method, url) {
    var name = generateNameFromUrl(url);
    
    var operation = new RESTOperation(name);
    operation.method = method;
    operation.urlTemplate = url;
    operation.host = host;
    
    if (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT") {
        operation.defaultContentType = "application/json";
    }
    
    System.debug("Creating operation '" + name + "' with URL '" + url + "'");
    System.debug("New operation: " + operation);
    
    operation = RESTHostManager.createTransientOperationFrom(operation);
    return operation;
}

/**
 * Ensures urlParamValues is an array.
 * @private
 */
function setUrlParamValues(urlParamValues) {
    return (!urlParamValues) ? [] : urlParamValues;
}

/**
 * Prepares the RESTRequest object.
 * @private
 */
function setRequest(op, urlParamValues, headers, contentType, content) {
    var request = op.createRequest(urlParamValues, content);
    if (contentType) {
        request.contentType = contentType;
    }
    
    if (headers) {
        for each (var header in headers) {
            request.setHeader(header.key, header.value);
        }
    }
    
    System.debug("Request to execute: " + request);
    System.log("Request URL: " + request.fullUrl);
    
    return request;
}

/**
 * Parses the RESTResponse.
 * @private
 */
function parseResponse(response) {
    const HTTP_ClientError = 404;
    var statusCode = response.statusCode;
    System.log("Status code: " + statusCode);
    
    var headers = response.getAllHeaders();
    if (headers && headers.keys) {
        for each (var headerKey in headers.keys) {
            System.debug(headerKey + ": " + headers.get(headerKey));
        }
    }
    
    var contentAsString = response.contentAsString;
    System.log("Response content as string: " + contentAsString);
    
    if (statusCode > HTTP_ClientError) {
        throw "HTTPError: status code: " + statusCode;
    } else {
        return contentAsString;
    }
}
