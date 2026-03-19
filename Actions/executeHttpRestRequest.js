/**
 * @description Provides a reusable HttpClient class for making various REST API calls
 *              (GET, POST, PUT, DELETE, PATCH) within vRO. Includes automatic retries,
 *              configurable expected response codes, and custom header support.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {Function} HttpClient - The HttpClient constructor.
 */

var logContextType = "Action";
var actionName = "httpRestActionForVro"; 
var LoggerFactory = System.getModule("com.simplygeek.library.util").logger(logContextType, actionName);
var log = new LoggerFactory(logContextType, actionName);

/**
 * Defines the HttpClient object.
 */
function HttpClient(targetRestHost, preferredAcceptType) {
    this.restHost = targetRestHost;
    this.acceptType = preferredAcceptType || "application/json";

    /**
     * Executes a GET request.
     */
    this.get = function(uri, successCodes, customHeaders) {
        return this._executeRequest("GET", uri, null, null, successCodes, customHeaders);
    };

    /**
     * Executes a POST request.
     */
    this.post = function(uri, body, bodyType, successCodes, customHeaders) {
        var content = body || "{}";
        return this._executeRequest("POST", uri, content, bodyType, successCodes, customHeaders);
    };

    /**
     * Executes a PUT request.
     */
    this.put = function(uri, body, bodyType, successCodes, customHeaders) {
        return this._executeRequest("PUT", uri, body, bodyType, successCodes, customHeaders);
    };

    /**
     * Executes a DELETE request.
     */
    this.delete = function(uri, body, bodyType, successCodes, customHeaders) {
        return this._executeRequest("DELETE", uri, body, bodyType, successCodes, customHeaders);
    };

    /**
     * Executes a PATCH request.
     */
    this.patch = function(uri, body, bodyType, successCodes, customHeaders) {
        return this._executeRequest("PATCH", uri, body, bodyType, successCodes, customHeaders);
    };

    /**
     * Private execution logic with retry capability.
     */
    this._executeRequest = function(method, uri, body, bodyType, successCodes, headers) {
        var apiResponse;
        var MAX_RETRIES = 5;
        var RETRY_DELAY_SEC = 10;
        var isSuccessful = false;
        
        // Default success code if none provided
        if (!successCodes || (Array.isArray(successCodes) && successCodes.length === 0)) {
            successCodes = [200];
        }

        this._createRequestObject(method, uri, body, bodyType, headers);
        log.debug("Dispatching " + method + " request to: " + this.request.fullUrl);

        var attemptIdx;
        for (attemptIdx = 0; attemptIdx < MAX_RETRIES; attemptIdx++) {
            try {
                apiResponse = this.request.execute();
                isSuccessful = true;
                break;
            } catch (execEx) {
                System.sleep(RETRY_DELAY_SEC * 1000);
                log.warn("REST Request failed on attempt " + (attemptIdx + 1) + ": " + execEx + ". Retrying...");
            }
        }

        if (!isSuccessful) {
            log.error("REST Request exhausted all " + MAX_RETRIES + " attempts. Aborting operation.");
            throw "Maximum retries exceeded for REST call.";
        }

        var resStatus = apiResponse.statusCode;
        if (successCodes.indexOf(resStatus) > -1) {
            log.debug("Response received successfully. HTTP Status: " + resStatus);
        } else {
            log.error("Unexpected Status Code: " + resStatus + ". Expected: [" + successCodes.join(", ") + "]");
            log.error("Response Payload: " + apiResponse.contentAsString);
        }

        return apiResponse;
    };

    /**
     * Private helper to initialize the REST:Request object.
     */
    this._createRequestObject = function(method, uri, body, bodyType, headers) {
        var encodedUri = encodeURI(uri);
        
        if (method === "GET" || !body) {
            this.request = this.restHost.createRequest(method, encodedUri);
        } else {
            var contentTypeStr = bodyType || this.acceptType;
            this.request = this.restHost.createRequest(method, encodedUri, body);
            this.request.contentType = contentTypeStr;
        }
        
        this._applyHeaders(headers);
    };

    /**
     * Private helper to apply headers to the request.
     */
    this._applyHeaders = function(headersMap) {
        this.request.setHeader("Accept", this.acceptType);
        
        if (headersMap && (headersMap instanceof Properties)) {
            var headerKeysList = headersMap.keys;
            var headerIdx;
            for (headerIdx = 0; headerIdx < headerKeysList.length; headerIdx++) {
                var key = headerKeysList[headerIdx];
                var val = headersMap.get(key);
                log.debug("Header -> " + key + ": " + val);
                this.request.setHeader(key, val);
            }
        }
    };
}

return HttpClient;
