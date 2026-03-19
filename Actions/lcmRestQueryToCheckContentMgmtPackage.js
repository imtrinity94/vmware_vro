/**
 * @description Queries the LCM (Lifecycle Manager) Content Management API to check whether a
 *              specific content package exists on a given endpoint. Polls asynchronously until
 *              the content list request completes, then searches the cached result for the package.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {string} lcmHostInstance - The LCM host FQDN or IP address.
 * @param {string} lcmLoginUser - The LCM username for authentication.
 * @param {string} lcmLoginPassword - The LCM password for authentication.
 * @param {string} vRslcmEndpointLink - The LCM endpoint link identifier.
 * @param {string} targetPackageType - The content package type to search for.
 * @param {string} targetPackageName - The name of the content package to verify.
 * @returns {void}
 */

if (!targetPackageName) {
    throw "Target package name is mandatory for LCM query.";
}

var contentRequestHeaders = new Properties();
contentRequestHeaders.put("accept", "application/json");

var contentListUrl = "https://" + lcmHostInstance + "/lcm/cms/api/v1/endpoints/" + vRslcmEndpointLink + "/content-list/" + targetPackageType + "?force=true";
System.log("Initiating content list request: " + contentListUrl);

try {
    var initialResponse = System.getModule("com.vmware.cse.utils").restHttpRequest("GET", contentListUrl, lcmLoginUser, lcmLoginPassword, contentRequestHeaders, null, null);
    System.debug("Initial API Response: " + initialResponse);

    if (initialResponse.indexOf("referenceId") === -1) {
        throw "Failed to fetch content list for endpoint: " + vRslcmEndpointLink;
    } else {
        var initialResponseJson = JSON.parse(initialResponse);
        var lcmRequestId = initialResponseJson['requestId'];
        var trackingUrl = "https://" + lcmHostInstance + "/lcm/cms/api/v1/requests/" + lcmRequestId;
        
        var pollingAttempts = 100;
        var resultRefId = null;

        System.log("Polling LCM request status for ID: " + lcmRequestId);
        while (pollingAttempts > 0) {
            var statusResponse = System.getModule("com.vmware.cse.utils").restHttpRequest("GET", trackingUrl, lcmLoginUser, lcmLoginPassword, contentRequestHeaders, null, null);
            var statusJson = JSON.parse(statusResponse);
            var currentStatus = statusJson['status'];

            if (currentStatus === "COMPLETED") {
                resultRefId = statusJson['outParameters'];
                break;
            } else if (currentStatus === "FAILED") {
                throw "LCM content fetch request failed for type: " + targetPackageType;
            } else if (currentStatus === "IN_PROGRESS") {
                pollingAttempts--;
                System.sleep(5000);
            }
        }

        if (resultRefId) {
            var cacheRetrievalUrl = "https://" + lcmHostInstance + "/lcm/cms/api/v1/endpoints/content-cache/" + resultRefId;
            System.debug("Retrieving cached content from: " + cacheRetrievalUrl);
            
            var cachedContentList = System.getModule("com.vmware.cse.utils").restHttpRequest("GET", cacheRetrievalUrl, lcmLoginUser, lcmLoginPassword, contentRequestHeaders, null, null);
            
            if (cachedContentList.indexOf(targetPackageName) !== -1) {
                System.log("Verification Success: " + targetPackageType + " '" + targetPackageName + "' found on endpoint " + vRslcmEndpointLink);
            } else {
                throw "Verification Failure: " + targetPackageType + " '" + targetPackageName + "' was not found on endpoint " + vRslcmEndpointLink;
            }
        } else {
            throw "Polling timeout or missing reference ID for content fetch.";
        }
    }
} catch (lcmEx) {
    if (typeof lcmEx === "string") {
        if (lcmEx.indexOf("404") !== -1) throw "vRealize LCM API endpoint does not exist (404).";
        if (lcmEx.indexOf("401") !== -1) throw "Authentication failed for vRealize LCM (401 Unauthorized).";
    }
    throw lcmEx;
}

return null;
