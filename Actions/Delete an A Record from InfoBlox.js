/**
 * @description Searches for a host record in InfoBlox by name via the WAPI, then deletes
 *              the matching record using a subsequent DELETE request. Logs success or throws
 *              on any HTTP or JSON parsing error.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {REST:RESTHost} objRESTHost_InfoBlox - The InfoBlox REST host.
 * @param {string} strARecord - The A/host record name to locate and delete.
 * @returns {void}
 */

try {
    var objRESTOperation = new RESTOperation("RESTOperation");
    objRESTOperation.defaultContentType = "application/json";
    objRESTOperation.method = "GET";
    objRESTOperation.urlTemplate = "/wapi/v1.1/record:host?_return_type=json&name=" + strARecord;
    objRESTOperation.host = objRESTHost_InfoBlox;

    var objRESTRequest = objRESTOperation.createRequest([], null);
    objRESTRequest.contentType = "application/json";
    objRESTRequest.setHeader("Accept", "application/json");

    var objRESTResponse = objRESTRequest.execute();

    var intStatusCode = objRESTResponse.statusCode;

    if (intStatusCode == 200) {
        var strContentAsString = objRESTResponse.contentAsString;

        try {
            var objJson = JSON.parse(strContentAsString);

            var arrRecords = objJson;

            var objRegExp = /(record:(cname|a|host|mx|ptr|txt))\/([A-Za-z0-9]+):([a-z0-9\-\.]+)\/default/;

            System.log("==================================================");

            for (var iiii = 0; iiii < arrRecords.length; iiii++) {
                var objRecord = arrRecords[iiii];

                var strRecordReference = objRecord._ref;

                System.log("===== RECORD REFERENCE: " + strRecordReference);

                var strRecordCanonical = objRecord.canonical;

                System.log("===== RECORD CANONICAL: " + strRecordCanonical);

                var strRecordName = objRecord.name;

                System.log("===== RECORD NAME: " + strRecordName);

                var arrRecordReference = objRegExp.exec(strRecordReference);

                var strObjectType = arrRecordReference[1];

                System.log("===== OBJECT TYPE: " + strObjectType);

                var strObjectReference = arrRecordReference[3];

                System.log("===== OBJECT REFERENCE: " + strObjectReference);

                var strObjectName = arrRecordReference[4];

                System.log("===== OBJECT NAME: " + strObjectName);

                if (strObjectName == strARecord) {
                    var objRESTOperation = new RESTOperation("RESTOperation");
                    objRESTOperation.defaultContentType = "application/json";
                    objRESTOperation.method = "DELETE";
                    objRESTOperation.urlTemplate = "/wapi/v1.1/record:host/" + strObjectReference + "?_return_type=json";
                    objRESTOperation.host = objRESTHost_InfoBlox;

                    var objRESTRequest = objRESTOperation.createRequest([], null);
                    objRESTRequest.contentType = "application/json";
                    objRESTRequest.setHeader("Accept", "application/json");

                    System.log("===== ATTEMPTING To DELETE A RECORD: " + strObjectName);

                    var objRESTResponse = objRESTRequest.execute();

                    if (objRESTResponse.statusCode == 200) {
                        System.log("===== SUCCESSFULLY DELETED A RECORD: " + strObjectName);
                    } else {
                        System.error("===== HTTP Error: " + objRESTResponse.statusCode);
                        throw "HTTP Error: " + objRESTResponse.statusCode;
                    }

                    break;
                }
            }

            System.log("==================================================");
        } catch (objException) {
            System.error("===== JSON Error: " + objException);
            throw "JSON Error: " + objException.code;
        }
    } else {
        System.error("===== HTTP Error: " + objRESTResponse.statusCode);
        throw "HTTP Error: " + objRESTResponse.statusCode;
    }
} catch (objException) {
    System.error("objException = " + objException);
}
