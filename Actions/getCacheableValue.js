/**
 * Provides a caching mechanism for vRO action results.
 * Uses DynamicTypes plugin's cache to store results based on a key generated from module name, action name, and arguments.
 * Significantly improves performance for repetitive read-only operations.
 * 
 * Pre-requisite: DynamicTypes Plugin installed.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} moduleName The module containing the action to cache.
 * @param {string} actionName The name of the action.
 * @param {boolean} forceReload If true, bypasses cache and refreshes the value.
 * @param {Array} args Arguments for the action call.
 * @returns {any} The cached or freshly retrieved result.
 */

var debug = function(msg) {
    // Set to true to enable debug logs in vRO
    if (false) {
        System.debug(msg);
    }
};

debug("Run getCacheableValue - moduleName = " + moduleName + " - actionName = " + actionName + " - args = " + args);
if (!moduleName || !actionName) {
    var errorMsg = "Error getCacheableValue - moduleName or actionName is mandatory !";
    System.error(errorMsg);
    throw errorMsg;
}

// Timeout in sec : Default = 72 hours
var CACHE_TIMEOUT = 72 * 60 * 60;
var CACHE_VALUES_BY_UUID_KEY = "__CACHE_VALUES_BY_UUID__";
var cacheUUID = DynamicTypesManager.getFromCache(CACHE_VALUES_BY_UUID_KEY);
var now = new Date().getTime();

if (!cacheUUID) {
    debug("getCacheableValue - Create cache entry for values by uuid");
    cacheUUID = {};
    DynamicTypesManager.putInCache(CACHE_VALUES_BY_UUID_KEY, cacheUUID);
}

/**
 * Stores a value in the internal UUID cache.
 * @private
 */
var storeWithUUID = function(valueToStore) {
    var newUUID = System.nextUUID();
    // Use String Representation to avoid object reference issues
    var valueToStoreStrRepr = Server.toStringRepresentation(valueToStore);
    var valueToStoreRepr = Server.fromStringRepresentation(valueToStoreStrRepr);
    cacheUUID[newUUID] = valueToStoreRepr;
    debug("storeWithUUID : " + newUUID + " with value " + JSON.stringify(valueToStoreRepr));
    return newUUID;
};

/**
 * Retrieves a value from the internal UUID cache.
 * @private
 */
var retrieveFromUUID = function(uuidToRetrieve) {
    var valueToRestore = cacheUUID[uuidToRetrieve];
    if (!valueToRestore) { return null; }
    var valueToRestoreStrRepr = Server.toStringRepresentation(valueToRestore);
    var valueToRestoreRepr = Server.fromStringRepresentation(valueToRestoreStrRepr);
    debug("retrieveFromUUID : " + uuidToRetrieve + " with value " + JSON.stringify(valueToRestoreRepr));
    return valueToRestoreRepr;
};

/**
 * Calls the target action dynamically.
 * @private
 */
var callAction = function(moduleNameInput, actionNameInput, argsInput) {
    var methodCallBuilder = new Array();
    methodCallBuilder.push("System.getModule(\"" + moduleNameInput + "\")." + actionNameInput);
    methodCallBuilder.push("(");

    var actionArgumentsSize = 0;
    var moduleAction = System.getModule(moduleNameInput);
    for each (var actionDesc in moduleAction.actionDescriptions) {
        if (actionDesc.name === actionNameInput) {
            actionArgumentsSize = actionDesc.parameters.length;
            break;
        }
    }
    
    if (argsInput.length < actionArgumentsSize) {
        System.error("getCacheableValue - " + moduleNameInput + " - " + actionNameInput + " - Input args length are different from call arguments needed : " + argsInput.length + "-" + actionArgumentsSize);
        var nbNeedArguments = (actionArgumentsSize - argsInput.length);
        for (var i = 0; i < nbNeedArguments; i++) {
            argsInput.push(null);
        }
    }

    // Deactivate using cache in calling action to avoid infinite loops
    var callArgs = argsInput.slice(); // Clone array
    callArgs.push("__CACHE_OFF__");

    var argsRefArray = [];
    for (var i = 0; i < callArgs.length; i++) {
        argsRefArray.push("callArgs[" + i + "]");
    }

    methodCallBuilder.push(argsRefArray.join(", "));
    methodCallBuilder.push(")");

    var evalString = methodCallBuilder.join("");
    debug("Calling action : " + evalString);

    return eval(evalString);
};

/**
 * Executes action and puts result in cache.
 * @private
 */
var putInCache = function(cacheKeyInput, moduleNameInput, actionNameInput, argsInput) {
    var putValue = callAction(moduleNameInput, actionNameInput, argsInput);
    debug("Value retrieved after calling action === " + JSON.stringify(putValue));

    var putObject = new Properties();
    putObject.put("moduleName", moduleNameInput);
    putObject.put("actionName", actionNameInput);
    putObject.put("args", argsInput);
    putObject.put("uuid", storeWithUUID(putValue));
    putObject.put("hash", System.getObjectId(putValue));
    putObject.put("timestamp", now);

    var putObjectJson = JSON.stringify(putObject);
    debug("cacheableObjectJson to put in cache = " + putObjectJson);
    DynamicTypesManager.putInCache(cacheKeyInput, putObjectJson);
    return putValue;
};

// Main execution
// Building a new Array of args because of type introspection problem
var argsArray = new Array();
for each (var argIn in args) {
    argsArray.push(argIn);
}

// Build the entire cacheKey with args if present
var cacheKey = null;
var cacheableObject = null;
try {
    var cacheKeyPrefix = moduleName + "." + actionName + "__";
    cacheKey = cacheKeyPrefix + System.getObjectId(argsArray);
    debug("Generated key = " + cacheKey);

    if (!forceReload) {
        var cacheableObjectJson = DynamicTypesManager.getFromCache(cacheKey);
        if (cacheableObjectJson) {
            cacheableObject = JSON.parse(cacheableObjectJson);
            debug("cacheableObject as Json retrieved from cache = " + cacheableObjectJson);
        }
    }
} catch (e) {
    debug("Failed get value or build key with error " + e);
    return callAction(moduleName, actionName, argsArray);
}

var cacheableValue = null;
if (cacheableObject) {
    var timestamp = cacheableObject.timestamp;
    var hash = cacheableObject.hash;

    // Comparison need to be in ms
    if (now - timestamp < (CACHE_TIMEOUT * 1000)) {
        debug("Value retrieved from cache...");
        cacheableValue = retrieveFromUUID(cacheableObject.uuid);
    }
    
    if (cacheableValue && System.getObjectId(cacheableValue) !== hash) {
        System.error("Problem when retrieving object from cache : hash are not equals for '" + moduleName + "." + actionName + "'! ");
        System.error("Cache Key : " + cacheKey);
        System.error("Original Hash : " + hash);
        System.error("Cache Value Hash : " + System.getObjectId(cacheableValue));
        cacheableValue = null;
    }
}

if (!cacheableValue) {
    debug("Cache value not found - Rebuilding it...");
    cacheableValue = putInCache(cacheKey, moduleName, actionName, argsArray);
}

debug("End getCacheableValue - cacheableValue = " + cacheableValue);
return cacheableValue;
