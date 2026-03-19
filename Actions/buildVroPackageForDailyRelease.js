/**
 * Creates a vRealize Orchestrator package containing specified workflows, actions, configurations, and resources.
 * This is useful for automated daily exports and version control integration.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} targetPackageName - Name of the package to create.
 * @param {string[]} wfCategoriesPathList - List of workflow category paths.
 * @param {string[]} actionModuleNamesList - List of action module names.
 * @param {string[]} configCategoriesPathList - List of configuration element category paths.
 * @param {string[]} resourceCategoriesPathList - List of resource element category paths.
 * @returns {void}
 */

// Dependency: Lodash via custom library module
var lodashHandle = System.getModule("fr.numaneo.library").lodashLibrary();

// Transient REST Host configuration targeting local vRO API
var vroApiBaseUrl = "https://localhost:8281";
var authStrategyParams = ["Per User Session", null, null];

var templateRestHost = RESTHostManager.createHost("TransientVroApiHost");
var transientVroHost = RESTHostManager.createTransientHostFrom(templateRestHost);
transientVroHost.url = vroApiBaseUrl;

var vroAuthenticationObj = RESTAuthenticationManager.createAuthentication("Basic", authStrategyParams);
transientVroHost.authentication = vroAuthenticationObj;

var packageEndpointPath = "/vco/api/packages/" + targetPackageName + "/";

/**
 * Dispatches an HTTP request to the vRO REST API.
 */
var dispatchApiRequest = function(apiSubPath, httpMethodVerb) {
    var emptyJsonPayload = "{}";
    var apiRequestObj = transientVroHost.createRequest(httpMethodVerb, apiSubPath, emptyJsonPayload);
    
    apiRequestObj.setHeader("accept", "application/json");
    apiRequestObj.setHeader("content-type", "application/json");
    
    System.debug("API-CALL [" + httpMethodVerb + "]: " + apiSubPath);

    var apiResponseObj = apiRequestObj.execute();
    var responseBodyText = apiResponseObj.contentAsString;

    if (!lodashHandle.includes([200, 201, 202, 204, 409], apiResponseObj.statusCode)) {
        System.error("Critical: REST Interaction Failed (" + apiSubPath + "). Status Code: " + apiResponseObj.statusCode);
        System.error("Response Details: " + responseBodyText);
    } else {
        System.debug("API-RESPONSE [Status: " + apiResponseObj.statusCode + "]");
    }
};

/**
 * Recursive traversal of vRO categories.
 */
var collectSubCategoriesRecursive = function(accumulatorArray, parentCategoryObj) {
    if (parentCategoryObj) {
        accumulatorArray.push(parentCategoryObj);
        lodashHandle.forEach(parentCategoryObj.subCategories, function(childCategory) {
            collectSubCategoriesRecursive(accumulatorArray, childCategory);
        });
    }
    return accumulatorArray;
};

System.log("Starting Package Lifecycle Management for: " + targetPackageName);

// 1. Prepare environment by removing existing instance
dispatchApiRequest(packageEndpointPath, "DELETE");

// 2. Initialize new package container
dispatchApiRequest(packageEndpointPath, "PUT");

// 3. Trigger initial index rebuild
dispatchApiRequest(packageEndpointPath + "rebuild", "POST");

// 4. Provision Workflow Categories
var provisionWorkflows = function(targetCategoryName) {
    var libraryWfCategories = Server.getWorkflowCategoryWithPath("Library").subCategories;
    var consolidatedCategories = lodashHandle.concat(Server.getAllWorkflowCategories(), libraryWfCategories);
    
    var matchedCategory = lodashHandle.find(lodashHandle.flattenDeep(consolidatedCategories), function(catItem) {
        return catItem.name === targetCategoryName;
    });
    
    if (matchedCategory) {
        var workflowLinkUrl = packageEndpointPath + "workflow_category/" + System.getObjectId(matchedCategory);
        dispatchApiRequest(workflowLinkUrl, "POST");
    } else {
        System.warn("Workflow Category not matched: " + targetCategoryName);
    }
};

lodashHandle.forEach(wfCategoriesPathList, function(categoryNameStr) {
    provisionWorkflows(categoryNameStr);
});

// 5. Provision Action Modules
var allSystemModules = System.getAllModules();
var matchedModulesList = lodashHandle.filter(allSystemModules, function(sysModule) {
    return lodashHandle.some(actionModuleNamesList, function(requestedName) {
        return lodashHandle.startsWith(sysModule.name, requestedName);
    });
});

lodashHandle.forEach(matchedModulesList, function(moduleObj) {
    var actionLinkUrl = packageEndpointPath + "action/" + moduleObj.name + "/";
    dispatchApiRequest(actionLinkUrl, "POST");
});

// 6. Provision Configuration Element Categories
var resolvedConfigCats = lodashHandle(configCategoriesPathList).map(function(pathStr) {
    var configCatObj = Server.getConfigurationElementCategoryWithPath(pathStr);
    return collectSubCategoriesRecursive([], configCatObj);
}).flatten().value();

lodashHandle.forEach(resolvedConfigCats, function(configCategoryItem) {
    var configLinkUrl = packageEndpointPath + "configuration_category/" + encodeURIComponent(configCategoryItem.path.replace(/\//g, ".")) + "/";
    dispatchApiRequest(configLinkUrl, "POST");
});

// 7. Provision Resource Element Categories
var resolvedResourceCats = lodashHandle(resourceCategoriesPathList).map(function(pathStr) {
    var resourceCatObj = Server.getResourceElementCategoryWithPath(pathStr);
    return collectSubCategoriesRecursive([], resourceCatObj);
}).flatten().value();

lodashHandle.forEach(resolvedResourceCats, function(resourceCategoryItem) {
    var resourceLinkUrl = packageEndpointPath + "resource_category/" + encodeURIComponent(resourceCategoryItem.path.replace(/\//g, ".")) + "/";
    dispatchApiRequest(resourceLinkUrl, "POST");
});

/**
 * Resolves root-level folder name for comparison logic.
 */
var resolveTopParentFolderName = function(wfOrCat) {
    var parentEntity = wfOrCat.parent;
    if (!parentEntity) {
        return wfOrCat.name;
    } else {
        var rootParentName = resolveTopParentFolderName(parentEntity);
        return (!rootParentName || rootParentName === "Library") ? wfOrCat.name : rootParentName;
    }
};

// 8. Refine and Cleanup Package Contents
var finalizedPackageObj = Server.getPackageWithName(targetPackageName);
if (finalizedPackageObj) {
    System.log("Generating Audit Report for Package: " + targetPackageName);
    System.log(" - Configuration Elements: " + (finalizedPackageObj.configurationElements ? finalizedPackageObj.configurationElements.length : 0));
    System.log(" - Resource Elements:      " + (finalizedPackageObj.resourceElements ? finalizedPackageObj.resourceElements.length : 0));
    System.log(" - Workflow Items:         " + (finalizedPackageObj.workflows ? finalizedPackageObj.workflows.length : 0));
    System.log(" - Action Items:           " + (finalizedPackageObj.actions ? finalizedPackageObj.actions.length : 0));

    // Remove Workflows that don't belong to the whitelist categories
    var workflowsToPurge = lodashHandle.filter(finalizedPackageObj.workflows, function(wfItem) {
        return lodashHandle.every(wfCategoriesPathList, function(whitelistName) {
            return resolveTopParentFolderName(wfItem.workflowCategory) !== whitelistName;
        });
    });

    lodashHandle.forEach(workflowsToPurge, function(wfPurgeItem) {
        dispatchApiRequest(packageEndpointPath + "workflow/" + System.getObjectId(wfPurgeItem), "DELETE");
    });

    // Remove Actions not belonging to the module whitelist
    var actionsToPurge = lodashHandle.filter(finalizedPackageObj.actions, function(actionItem) {
        return lodashHandle.every(actionModuleNamesList, function(modulePrefix) {
            return actionItem.module.name.indexOf(modulePrefix) === -1;
        });
    });

    lodashHandle.forEach(actionsToPurge, function(actionPurgeItem) {
        dispatchApiRequest(packageEndpointPath + "action/" + System.getObjectId(actionPurgeItem), "DELETE");
    });

    // Remove Resource Elements outside the category hierarchy
    var resourcesToPurge = lodashHandle.filter(finalizedPackageObj.resourceElements, function(resElementItem) {
        return lodashHandle.every(resourceCategoriesPathList, function(categoryPathPrefix) {
             return resElementItem.getResourceElementCategory().path.indexOf(categoryPathPrefix) === -1;
        });
    });

    lodashHandle.forEach(resourcesToPurge, function(resPurgeItem) {
        dispatchApiRequest(packageEndpointPath + "resource/" + System.getObjectId(resPurgeItem), "DELETE");
    });

    System.log("Package '" + targetPackageName + "' refinement successful.");
}

return null;
