if (packageName == null || packageName.length == 0) {
    throw "Invalid alert name";
}
var contentType = packageType;
var headers = new Properties();
headers.put("accept", "application/json");

var listUrl = "https://" + lcmHost + "/lcm/cms/api/v1/endpoints/" + endpointLink + "/content-list/" + packageType + "?force=true";
System.log("listUrl :: " + listUrl);
//headers.put("Authorization",authToken);
try {
    //	var httpdata = JSON.parse(System.getModule("com.vmware.cse.clm.xenon").request("GET",listUrl));
    var httpData = System.getModule("com.vmware.cse.utils").restHttpRequest("GET", listUrl, lcmUser, lcmPassword, headers, null, null);
    System.log("Http response :::::  " + httpData);
    if (httpData.indexOf("referenceId") == -1) {
        throw "Error while trying to fetch endpoint contents of endpoint : " + endpointLink;
    } else {
        var httpResponse = JSON.parse(httpData);
        var reqId = httpResponse['requestId'];
        var reqUrl = "https://" + lcmHost + "/lcm/cms/api/v1/requests/" + reqId;
        var count = 100;
        var refId = null;
        while (count > 0) {
            var reqResponse = System.getModule("com.vmware.cse.utils").restHttpRequest("GET", reqUrl, lcmUser, lcmPassword, headers, null, null);
            var reqResponseData = JSON.parse(reqResponse);
            var reqStatus = reqResponseData['status'];
            if (reqStatus.equals("COMPLETED")) {
                refId = reqResponseData['outParameters'];
                break;
            } else if (reqStatus.equals("FAILED")) {
                throw "Error: Couldn't fetch the contents of type : " + packageType + " of endpoint " + endpointLink;
            } else if (reqStatus.equals("IN_PROGRESS")) {
                count--;
                System.sleep(5000);
            }
        }
        if (refId != null) {
            var cacheUrl = "https://" + lcmHost + "/lcm/cms/api/v1/endpoints/content-cache/" + refId;
            System.log("cacheUrl :: " + cacheUrl);
            var listResponseData = System.getModule("com.vmware.cse.utils").restHttpRequest("GET", cacheUrl, lcmUser, lcmPassword, headers, null, null);
            if (listResponseData.indexOf(packageName) != -1) {
                System.log("Found: " + packageType + " " + packageName + " found on endpoint " + endpointLink);
            } else {
                throw "Error: " + packageType + " " + packageName + " not found on endpoint " + endpointLink;
            }
        } else {
            throw "Error: Couldn't fetch the contents of type : " + packageType + " of endpoint " + endpointLink;
        }
    }
} catch (err) {
    if (err.indexOf("404") != -1) {
        throw ("API does not exist!");
    } else if (err.indexOf("401") != -1) {
        throw ("Failed to connect to Blackstone Spring Endpoint  - 401 Unauthorized error");
    } else {
        throw err;
    }
}
