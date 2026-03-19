/**
 * @description Authenticates against the vCloud Director API and retrieves the
 *              `x-vcloud-authorization` session token required for subsequent API calls.
 *              Uses Basic authentication and a dynamic (transient) REST host.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {string} sessionid - The x-vcloud-authorization token string.
 */

System.log("Fetching x-vcloud-authorization header");

var vCD_UserName = "xzx-123@system"; // for an LDAP user xzx-123
var vCD_Password = "XXXX12345";
var vCD_API_URL = VclHostManager.getHostList()[0].url.split(":443")[0]; // Selected vCD host is the one at the top of the list under vCD Plugin
var header = '[{"key":"Accept","value":"application/*;version=29.0"}]';
var sessionResponse = invokeRestOperationMultipleHeaders(vCD_API_URL, vCD_UserName, vCD_Password, "api/sessions", "POST", "", header);
var sessionid = "";
if (getHttpOperationStatus(sessionResponse.statusCode)) {
    sessionid = sessionResponse.getHeaderValues('x-vcloud-authorization');
    System.warn("x-vcloud-authorization: \n" + sessionid);
}
if (sessionid == "") {
    throw new Error("Empty session id is received");
}

/**
 * Creates a transient REST host and executes an HTTP request with multiple custom headers.
 *
 * @param {string} API_URL - The base URL of the REST API.
 * @param {string} API_USER - The username for Basic authentication.
 * @param {string} API_KEY - The password for Basic authentication.
 * @param {string} QueryString - The API path/query string to append.
 * @param {string} HttpMethod - The HTTP method (GET, POST, etc.).
 * @param {string} Body - The request body content.
 * @param {string} Headers - A JSON string array of {key, value} header objects.
 * @param {string} [contentType] - The content type for the request body.
 * @returns {*} The REST response object.
 */
function invokeRestOperationMultipleHeaders(API_URL, API_USER, API_KEY, QueryString, HttpMethod, Body, Headers, contentType) {
    var url = API_URL;
    var userName = API_USER;
    var userPassword = API_KEY;
    var queryString = QueryString;
    var httpMethod = HttpMethod;
    var content = Body;
    var headers = JSON.parse(Headers);

    var restHost = RESTHostManager.createHost("DynamicRequest");
    var transientHost = RESTHostManager.createTransientHostFrom(restHost);
    transientHost.url = url;
    if (userName != null && userName != "") {
        var authParams = ["Per User Session", userName, userPassword];
        var authenticationObject = RESTAuthenticationManager.createAuthentication("Basic", authParams);
        transientHost.authentication = authenticationObject;
    }
    var request = transientHost.createRequest(httpMethod, queryString, content);
    request.contentType = contentType;

    if (headers) {
        for (var i = 0; i < headers.length; i++) {
            request.setHeader(headers[i].key, headers[i].value);
        }
    }

    var response;
    if (userName != null && userName != "") {
        response = request.executeWithCredentials(userName, userPassword);
    } else {
        response = request.execute();
    }
    return response;
}

/**
 * Returns true if an HTTP status code represents a successful response.
 *
 * @param {number} HttpStatusCode - The HTTP status code to evaluate.
 * @returns {boolean} True if the status code is in the success range.
 */
function getHttpOperationStatus(HttpStatusCode) {
    var successArray = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 302];
    return (successArray.indexOf(HttpStatusCode) > -1) ? true : false;
}
