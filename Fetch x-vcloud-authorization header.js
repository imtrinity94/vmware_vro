System.log("Fetching x-vcloud-authorization header");

var vCD_UserName = "xzx-123@system"; //for a LADP user xzx-123
var vCD_Password = "XXXX12345";
var vCD_API_URL = System.getModule("org.telus.vCloud").getvCloudHost().url.split(":443")[0];
var header = '[{"key":"Accept","value":"application/*;version=29.0"}]';
var sessionResponse = invokeRestOperationMultipleHeaders(vCD_API_URL, vCD_UserName, vCD_Password, "api/sessions", "POST", "", header);
var sessionid = "";
if (System.getModule("org.telus.xavient.util").getHttpOperationStatus(sessionResponse.statusCode)) {
    sessionid = sessionResponse.getHeaderValues('x-vcloud-authorization');
    System.warn("x-vcloud-authorization: \n" + sessionid);
}
if (sessionid == "") {
    throw new Error("Empty session id is received");
}

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
};
