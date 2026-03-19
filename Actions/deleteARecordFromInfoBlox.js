/**
 * @description Searches for a host record in InfoBlox by name via the WAPI, then deletes
 *              the matching record using a subsequent DELETE request. Logs success or throws
 *              on any HTTP or JSON parsing error.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {REST:RESTHost} infoBloxRestHost - The InfoBlox REST host.
 * @param {string} aRecordName - The A/host record name to locate and delete.
 * @returns {void}
 */

try {
    var searchOperation = new RESTOperation("SearchARecord");
    searchOperation.defaultContentType = "application/json";
    searchOperation.method = "GET";
    searchOperation.urlTemplate = "/wapi/v1.1/record:host?_return_type=json&name=" + aRecordName;
    searchOperation.host = infoBloxRestHost;

    var searchRequest = searchOperation.createRequest([], null);
    searchRequest.contentType = "application/json";
    searchRequest.setHeader("Accept", "application/json");

    var searchResponse = searchRequest.execute();
    var searchStatusCode = searchResponse.statusCode;

    if (searchStatusCode == 200) {
        var responseBody = searchResponse.contentAsString;

        try {
            var recordsFound = JSON.parse(responseBody);
            var recordTypeRegex = /(record:(cname|a|host|mx|ptr|txt))\/([A-Za-z0-9]+):([a-z0-9\-\.]+)\/default/;

            System.log("Searching for InfoBlox records matching: " + aRecordName);

            var i;
            for (i = 0; i < recordsFound.length; i++) {
                var recordEntry = recordsFound[i];
                var refStr = recordEntry._ref;

                System.debug("Checking record reference: " + refStr);

                var matchResult = recordTypeRegex.exec(refStr);
                if (!matchResult) continue;

                var objectTypeStr = matchResult[1];
                var objectRefUuid = matchResult[3];
                var objectNameStr = matchResult[4];

                if (objectNameStr == aRecordName) {
                    var deleteOperation = new RESTOperation("DeleteARecord");
                    deleteOperation.defaultContentType = "application/json";
                    deleteOperation.method = "DELETE";
                    // Using the object reference ID extracted from the regex
                    deleteOperation.urlTemplate = "/wapi/v1.1/record:host/" + objectRefUuid + "?_return_type=json";
                    deleteOperation.host = infoBloxRestHost;

                    var deleteRequest = deleteOperation.createRequest([], null);
                    deleteRequest.contentType = "application/json";
                    deleteRequest.setHeader("Accept", "application/json");

                    System.log("Attempting to delete InfoBlox record: " + objectNameStr);

                    var deleteResponse = deleteRequest.execute();

                    if (deleteResponse.statusCode == 200) {
                        System.log("Successfully deleted InfoBlox record: " + objectNameStr);
                    } else {
                        System.error("Failed to delete record. HTTP Status: " + deleteResponse.statusCode);
                        throw "HTTP Error " + deleteResponse.statusCode;
                    }
                    break;
                }
            }
        } catch (e) {
            System.error("JSON parsing error during InfoBlox search: " + e);
            throw "JSON Error: " + e;
        }
    } else {
        System.error("InfoBlox search failed. HTTP Status: " + searchStatusCode);
        throw "HTTP Error " + searchStatusCode;
    }
} catch (e) {
    System.error("Exception during InfoBlox record deletion: " + e);
}

return null;
