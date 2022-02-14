/**
 * Goal :
 * This action allows to put in cache all results of others actions.
 * It could be helpful when you use VRA and its forms that take too long to build (Error : "Failed to retrieve form from provider"), 
 * or when you want to retrieve attribute value in Configuration Element faster.
 *
 * Pre-requisite : DynamicTypes Plugin installed (current use version : 1.3.0)
 * 
 * How is it working :
 * It builds a cache key with all input args and stored the result (using DynamicTypesManager.putInCache() method)
 * If we call a second times the same action with the same args, it will find the entry and return the cache value.
 * It's really easy to use in all your actions that do only read (of course!) and returns some "ref" data.
 * An example of "ref" data is an attribute value inside a Configuration Element.
 * 
 * Performance :
 * All actions return from cache in approximatively 15ms.
 * To compare : Finding an attribute value by its name inside a Configuration Element Category (by its name) : around 150ms.
 * 
 * Sample :
 * Package : fr.numaneo.library
 * Action : getCacheableValue
 * Input Parameters :
 *  -moduleName - String
 *  -actionName - String
 *  -args - Array Of Any
 *
 * Output Parameters : Any
 *
 * Script in Workflow use:
 * // This action is fr.numaneo.formactions.mycatalog.getZones()
 * ////////////////////////////////////////
 * var moduleName = "fr.numaneo.formactions.mycatalog"; // Module of the current action
 * var actionName = "getZones"; // Name of the current action
 * if(arguments[arguments.length -1] !== "__CACHE_OFF__") {
 *	return System.getModule("fr.numaneo").getCacheableValue(moduleName, actionName, false, arguments); // Call cache each time
 * }
 * ////////////////////////////////////////
 *
 * var categoryConstants = Server.getConfigurationElementCategoryWithPath("CONSTANTS");
 * var zoneConfigElement = null;
 * for each(var configElem in categoryConstants.configurationElements ) {
 *    if(configElem.name === "ZONES") {
 *       zoneConfigElement = configElem;
 *       break;
 *   }
 * }
 * return zoneConfigElement.getAttributeWithKey("ALL_ZONES").value;
 *
 */


var debug = function(msg) {
	// Only true in dev environment
	if(false) {
		System.debug(msg);
	}
};

debug("Run getCacheableValue - moduleName = " + moduleName + " - actionName = " + actionName + " - args = " + args);
if(!!!moduleName || !!!actionName) {
	var errorMsg = "Error getCacheableValue - moduleName or actionName is mandatory !";
	System.error(errorMsg);
	throw errorMsg;
}
////////////////////////////////////////

////////////////////////////////////////
/***************************************/
/* Init
/***************************************/

// Timeout in sec : Default = 72 hours
var CACHE_TIMEOUT = 72 * 60 * 60;
var CACHE_VALUES_BY_UUID_KEY = "__CACHE_VALUES_BY_UUID__";
var cacheUUID = DynamicTypesManager.getFromCache(CACHE_VALUES_BY_UUID_KEY);
var now = new Date().getTime();
if(!cacheUUID) {
	debug("getCacheableValue - Create cache entry for values by uuid");
	cacheUUID = {};
	DynamicTypesManager.putInCache(CACHE_VALUES_BY_UUID_KEY, cacheUUID);
}

/***************************************/
/* Functions
/***************************************/
var storeWithUUID = function(valueToStore) {
	var newUUID = System.nextUUID();
	// Try to avoid object reference modification by using String Representation converter
	var valueToStoreStrRepr = Server.toStringRepresentation(valueToStore)
	var valueToStoreRepr = Server.fromStringRepresentation(valueToStoreStrRepr)
	cacheUUID[newUUID] = valueToStoreRepr;
	debug("storeWithUUID : " + newUUID + " with value " + JSON.stringify(valueToStoreRepr));
	return newUUID;
};

var retrieveFromUUID = function(uuidToRetrieve) {
	var valueToRestore = cacheUUID[uuidToRetrieve];
	// Try to avoid object reference modification by using String Representation converter
	var valueToRestoreStrRepr = Server.toStringRepresentation(valueToRestore)
	var valueToRestoreRepr = Server.fromStringRepresentation(valueToRestoreStrRepr)
	debug("retrieveFromUUID : " + uuidToRetrieve + " with value " + JSON.stringify(valueToRestoreRepr));
	return valueToRestoreRepr;
};

var callAction = function(moduleNameInput, actionNameInput, argsInput) {
	var methodCallBuilder = new Array();
	methodCallBuilder.push("System.getModule(\"" + moduleNameInput + "\")." + actionNameInput);
	methodCallBuilder.push("(");

	var actionArgumentsSize = 0;
	var moduleAction = System.getModule(moduleNameInput);
	for each(var action in moduleAction.actionDescriptions) {
		if(action.name === actionNameInput) {
			actionArgumentsSize = action.parameters.length;
			break;
		}
	}
	if(argsInput.length < actionArgumentsSize) {
		System.error("getCacheableValue - " + moduleNameInput + " - " + actionNameInput + " - Input args length are different from call arguments needed : " + argsInput.length + "-" + actionArgumentsSize);
		var nbNeedArguments = (actionArgumentsSize - argsInput.length);
		for(var i = 0; i < nbNeedArguments; i++) {
			argsInput.push(null);
		}
	}

	/* /!\ */
	//	Deactivate using cache in calling action
	argsInput.push("__CACHE_OFF__");
	/* /!\ */

	var argsArray = [];
	for(var i = 0; i < argsInput.length; i++) {
		argsArray.push("argsInput[" + i + "]");
	}

	methodCallBuilder.push(argsArray.join(", "));
	methodCallBuilder.push(")");

	var action = methodCallBuilder.join("");

	debug("Calling action : " + action);

	return eval(action);
}

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
}


/***************************************/
/* Main
/***************************************/

// Building a new Array of args because of type introspection problem
var argsArray = new Array();
for each(var argIn in args) {
	argsArray.push(argIn);
}

// Build the entire cacheKey with args if present
var cacheKey = null;
var cacheableObject = null;
try {
	var cacheKeyPrefix = moduleName + "." + actionName + "__";
	cacheKey = cacheKeyPrefix + System.getObjectId(argsArray);

	debug("Generated key = " + cacheKey);

	var cacheableObjectJson = DynamicTypesManager.getFromCache(cacheKey);
	cacheableObject = JSON.parse(cacheableObjectJson);
	debug("cacheableObject as Json retrieved from cache = " + cacheableObjectJson);
} catch(e) {
	debug("Failed get value or build key with error " + e);
	return callAction(moduleName, actionName, argsArray);
}

var cacheableValue;
if(cacheableObject) {
	var timestamp = cacheableObject.timestamp;
	var hash = cacheableObject.hash;

	// Comparaison need to be in ms
	if(now - timestamp < (CACHE_TIMEOUT * 1000)) {
		debug("Value retrieved from cache...");
		cacheableValue = retrieveFromUUID(cacheableObject.uuid);
	}
	if(cacheableValue && System.getObjectId(cacheableValue) !== hash) {
		System.error("Problem when retrieving object from cache : hash are not equals for '" + moduleName + "." + actionName + "'! ")
		System.error("Cache Key : " + cacheKey);
		System.error("Original Hash : " + hash);
		System.error("Cache Value Hash : " + System.getObjectId(cacheableValue));
		cacheableValue = null;
	}
	/* else if(cacheableValue) {
		debug("Equality of hash");
	}*/
}

if(!cacheableValue) {
	debug("Cache value not found - Rebuilding it...");
	cacheableValue = putInCache(cacheKey, moduleName, actionName, argsArray);
}

debug("End getCacheableValue - cacheableValue = " + cacheableValue);
return cacheableValue;
