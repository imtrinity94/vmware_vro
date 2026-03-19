/**
 * @description Creates a CNAME DNS record in InfoBlox by making a POST request to the InfoBlox
 *              WAPI. Returns a log message on success or a warning on failure.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {REST:RESTHost} objRESTHost - The InfoBlox REST host to make the API call against.
 * @param {string} strCName - The canonical name (target) for the CNAME record.
 * @param {string} strARecord - The alias (source) name for the CNAME record.
 * @returns {void}
 */

var strJson = '{"canonical":"' + strCName + '","name":"' + strARecord + '"}';

try {
    var objRESTOperation = new RESTOperation("RESTOperation");
    objRESTOperation.defaultContentType = "application/json";
    objRESTOperation.method = "POST";
    objRESTOperation.urlTemplate = "/wapi/v1.1/record:cname";
    objRESTOperation.host = objRESTHost;

    var objRESTRequest = objRESTOperation.createRequest(null, strJson);
    objRESTRequest.contentType = "application/json";
    objRESTRequest.setHeader("Accept", "application/json");

    var objRESTResponse = objRESTRequest.execute();

    var intStatusCode = objRESTResponse.statusCode;

    var objJSON = JSON.parse(objRESTResponse.contentAsString);

    if (intStatusCode == 201) {
        System.log("Successfully Added a CName Record for : '" + strCName + "' pointing to '" + strARecord + "' into InfoBlox.");
    } else {
        var strError = objJSON.Error;
        var strCode = objJSON.code;
        var strText = objJSON.text;

        System.warn("HTTP Error: " + intStatusCode + ", " + strText);
    }
} catch (objException) {
    System.error("objException = " + objException);
}
