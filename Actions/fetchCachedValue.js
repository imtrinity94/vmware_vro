/**
 * Provides a caching mechanism for vRO action results.
 * Uses DynamicTypes plugin's cache to store results based on a key generated from module name, action name, and arguments.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} moduleName The module containing the action to cache.
 * @param {string} actionName The name of the action.
 * @param {boolean} forceReload If true, bypasses cache and refreshes the value.
 * @param {Array} args Arguments for the action call.
 * @returns {any} resultValue - The cached or freshly retrieved result.
 */

var logDebug = function (message) {
    // Set to true to enable debug logs in vRO
    if (true) {
        System.debug("[Cache] " + message);
    }
};

logDebug("Executing getCacheableValue for " + moduleName + "." + actionName);

if (!moduleName || !actionName) {
    throw "moduleName and actionName are required for getCacheableValue.";
}

// Timeout in sec : Default = 72 hours
var CACHE_EXPIRY_SECONDS = 72 * 60 * 60;
var CACHE_ID_MAP_KEY = "__CACHE_VALUES_BY_UUID__";
var cacheUuidMap = DynamicTypesManager.getFromCache(CACHE_ID_MAP_KEY);
var currentTimeMs = new Date().getTime();

if (!cacheUuidMap) {
    logDebug("Initializing UUID-based value cache.");
    cacheUuidMap = {};
    DynamicTypesManager.putInCache(CACHE_ID_MAP_KEY, cacheUuidMap);
}

/**
 * Stores a value in the internal UUID cache.
 */
var persistToUuidCache = function (value) {
    var newUuid = System.nextUUID();
    // Using string representation to decouple objects from their original SDK connection if necessary
    var serializedValue = Server.toStringRepresentation(value);
    var deserializedValue = Server.fromStringRepresentation(serializedValue);
    cacheUuidMap[newUuid] = deserializedValue;
    logDebug("Stored value with UUID: " + newUuid);
    return newUuid;
};

/**
 * Retrieves a value from the internal UUID cache.
 */
var fetchFromUuidCache = function (uuid) {
    var cachedData = cacheUuidMap[uuid];
    if (!cachedData) return null;
    var serialized = Server.toStringRepresentation(cachedData);
    return Server.fromStringRepresentation(serialized);
};

/**
 * Calls the target action dynamically.
 */
var executeTargetAction = function (mod, act, actionArgs) {
    var actionObject = System.getModule(mod);
    var requiredParamCount = 0;

    var descriptions = actionObject.actionDescriptions;
    var i;
    for (i = 0; i < descriptions.length; i++) {
        var desc = descriptions[i];
        if (desc.name === act) {
            requiredParamCount = desc.parameters.length;
            break;
        }
    }

    // Ensure arg count matches expectations (append nulls if missing)
    if (actionArgs.length < requiredParamCount) {
        var missingCount = requiredParamCount - actionArgs.length;
        var j;
        for (j = 0; j < missingCount; j++) {
            actionArgs.push(null);
        }
    }

    // Add bypass flag to avoid recursion
    var executionArgs = actionArgs.slice();
    executionArgs.push("__CACHE_OFF__");

    var argReferenceList = [];
    var k;
    for (k = 0; k < executionArgs.length; k++) {
        argReferenceList.push("executionArgs[" + k + "]");
    }

    var evalExpression = "System.getModule(\"" + mod + "\")." + act + "(" + argReferenceList.join(", ") + ")";
    logDebug("Dynamic Call: " + evalExpression);

    return eval(evalExpression);
};

/**
 * Executes action and refreshes cache.
 */
var updateAndCacheResult = function (key, mod, act, actionArgs) {
    var resultObj = executeTargetAction(mod, act, actionArgs);

    var cacheMetadata = new Properties();
    cacheMetadata.put("moduleName", mod);
    cacheMetadata.put("actionName", act);
    cacheMetadata.put("args", actionArgs);
    cacheMetadata.put("uuid", persistToUuidCache(resultObj));
    cacheMetadata.put("hash", System.getObjectId(resultObj));
    cacheMetadata.put("timestamp", currentTimeMs);

    DynamicTypesManager.putInCache(key, JSON.stringify(cacheMetadata));
    return resultObj;
};

// Main logic
var normalizedArgsList = [];
var l;
if (args) {
    for (l = 0; l < args.length; l++) {
        normalizedArgsList.push(args[l]);
    }
}

var mainCacheKey = null;
var metaFromCache = null;

try {
    var keyPrefix = moduleName + "." + actionName + "__";
    mainCacheKey = keyPrefix + System.getObjectId(normalizedArgsList);
    logDebug("Resolved Cache Key: " + mainCacheKey);

    if (!forceReload) {
        var jsonMeta = DynamicTypesManager.getFromCache(mainCacheKey);
        if (jsonMeta) {
            metaFromCache = JSON.parse(jsonMeta);
        }
    }
} catch (keyEx) {
    logDebug("Cache key resolution or retrieval failed: " + keyEx);
    return executeTargetAction(moduleName, actionName, normalizedArgsList);
}

var resultValue = null;
if (metaFromCache) {
    var cachedTime = metaFromCache.timestamp;
    var originalHash = metaFromCache.hash;

    if (currentTimeMs - cachedTime < (CACHE_EXPIRY_SECONDS * 1000)) {
        logDebug("Hit: Retrieving from cache...");
        resultValue = fetchFromUuidCache(metaFromCache.uuid);
    }

    if (resultValue && System.getObjectId(resultValue) !== originalHash) {
        System.error("Integrity check failed for cached object '" + moduleName + "." + actionName + "'. Hash mismatch.");
        resultValue = null;
    }
}

if (resultValue === null) {
    logDebug("Miss: Rebuilding value...");
    resultValue = updateAndCacheResult(mainCacheKey, moduleName, actionName, normalizedArgsList);
}

return resultValue;
