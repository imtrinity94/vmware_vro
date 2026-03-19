/**
 * @description Creates a vRO package containing specified workflows, actions, configuration
 *              elements, and resource elements. Helpful for automated daily exports to
 *              version control systems like Git.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 * @note Pre-requisite: Use of lodash Library.
 *
 * @param {string} packageNameInput - Name of the package to create.
 * @param {string[]} workflowCategoriesListInput - List of Workflow Category names to include.
 * @param {string[]} moduleActionsListInput - List of Action Module names to include.
 * @param {string[]} configurationCategoriesListInput - List of Configuration Category paths to include.
 * @param {string[]} resourceCategoriesListInput - List of Resource Category paths to include.
 * @returns {void}
 */

// Load Lodash functions
var _ = System.getModule("fr.numaneo.library").lodashLibrary();

// Create REST Host to VRO
var restUser = null;
var restPassword = null;
var baseRest = RESTHostManager.createHost("DynamicRequest");
var transientHost = RESTHostManager.createTransientHostFrom(baseRest);
transientHost.url = "https://localhost:8281";

var authParamsList = ["Per User Session", restUser, restPassword];
var authObj = RESTAuthenticationManager.createAuthentication("Basic", authParamsList);
transientHost.authentication = authObj;

var packageUrlBase = "/vco/api" + "/packages/" + packageNameInput + "/"; // Last "/" is crucial

/**
 * Sends a REST request to the vRO API.
 */
var executeRestCall = function(targetUrl, httpMethod) {
    var emptyPayload = "{}";
    var restRequest = transientHost.createRequest(httpMethod, targetUrl, emptyPayload);
    restRequest.setHeader("accept", "application/json");
    restRequest.setHeader("content-type", "application/json");
    System.debug("Executing: " + httpMethod + " " + targetUrl);

    var restResponse = restRequest.execute();
    var responseBodyContent = restResponse.contentAsString;

    System.debug("Response Status Code: " + restResponse.statusCode);

    if (!_.includes([200, 201, 202, 204, 409], restResponse.statusCode)) {
        System.error("REST call failed for: " + targetUrl);
        System.error("Status: " + restResponse.statusCode);
        System.error("Body: " + responseBodyContent);
    }
};

/**
 * Recursively retrieves sub-categories.
 */
var collectSubCategories = function(acc, categoryObj) {
    acc.push(categoryObj);
    _.forEach(categoryObj.subCategories, function(sub) {
        collectSubCategories(acc, sub);
    });
    return acc;
};

// Cleanup old package
executeRestCall(packageUrlBase, "DELETE");

// Create package
executeRestCall(packageUrlBase, "PUT");

// Rebuild package
executeRestCall(packageUrlBase + "rebuild", "POST");

/**
 * Adds workflows under a workflow category to the package.
 */
var addWorkflowsByCategory = function(catName) {
    var allCats = _.concat(Server.getAllWorkflowCategories(), Server.getWorkflowCategoryWithPath("Library").subCategories);
    var foundCat = _.find(_.flattenDeep(allCats), function(c) {
        return c.name === catName;
    });
    if (foundCat) {
        var addWfUrl = packageUrlBase + "workflow_category/" + System.getObjectId(foundCat);
        executeRestCall(addWfUrl, "POST");
    } else {
        System.warn("Workflow Category not found: " + catName);
    }
};

_.forEach(workflowCategoriesListInput, function(wfCat) {
    addWorkflowsByCategory(wfCat);
});

// Add module actions
var matchedModules = _.filter(System.getAllModules(), function(m) {
    return _.some(moduleActionsListInput, function(inputName) {
        return _.startsWith(m.name, inputName);
    });
});

_.forEach(matchedModules, function(mObj) {
    var addActUrl = packageUrlBase + "action/" + mObj.name + "/";
    executeRestCall(addActUrl, "POST");
});

// Add configuration elements
var configCategoriesFound = _(configurationCategoriesListInput).map(function(p) {
    var c = Server.getConfigurationElementCategoryWithPath(p);
    return collectSubCategories([], c);
}).flatten().value();

_.forEach(configCategoriesFound, function(configCat) {
    var cPath = configCat.path;
    var addCfgUrl = packageUrlBase + "configuration_category/" + encodeURIComponent(cPath.replace("/", ".")) + "/";
    executeRestCall(addCfgUrl, "POST");
});

// Add resource elements
var resourceCategoriesFound = _(resourceCategoriesListInput).map(function(p) {
    var r = Server.getResourceElementCategoryWithPath(p);
    return collectSubCategories([], r);
}).flatten().value();

_.forEach(resourceCategoriesFound, function(resCat) {
    var rPath = resCat.path;
    var addResUrl = packageUrlBase + "resource_category/" + encodeURIComponent(rPath.replace("/", ".")) + "/";
    executeRestCall(addResUrl, "POST");
});

/**
 * Helper to get the top-level parent folder name.
 */
var getTopParentName = function(elem) {
    var parentNode = elem.parent;
    if (!parentNode) {
        return elem.name;
    } else {
        var rootName = getTopParentName(parentNode);
        if (!rootName || rootName === "Library") {
            return elem.name;
        } else {
            return rootName;
        }
    }
};

var pkgObj = Server.getPackageWithName(packageNameInput);
if (pkgObj) {
    System.log("Package stats for '" + pkgObj.name + "':");
    System.log("  Workflows: " + (pkgObj.workflows ? pkgObj.workflows.length : 0));
    System.log("  Actions: " + (pkgObj.actions ? pkgObj.actions.length : 0));

    // Cleanup workflows
    var workflowsToRemoveList = _.filter(pkgObj.workflows, function(w) {
        return _.every(workflowCategoriesListInput, function(inputCat) {
            return getTopParentName(w.workflowCategory) !== inputCat;
        });
    });

    _.forEach(workflowsToRemoveList, function(wObj) {
        var rmWfUrl = packageUrlBase + "workflow/" + System.getObjectId(wObj);
        executeRestCall(rmWfUrl, "DELETE");
    });

    // Cleanup actions
    var actionsToRemoveList = _.filter(pkgObj.actions, function(a) {
        return _.every(moduleActionsListInput, function(inputMod) {
            return a.module.name.indexOf(inputMod) === -1;
        });
    });

    _.forEach(actionsToRemoveList, function(aObj) {
        var rmActUrl = packageUrlBase + "action/" + System.getObjectId(aObj);
        executeRestCall(rmActUrl, "DELETE");
    });

    // Cleanup resources
    var resourcesToRemoveList = _.filter(pkgObj.resourceElements, function(r) {
        return _.every(workflowCategoriesListInput, function(inputCat) {
            return getTopParentName(r.getResourceElementCategory()) !== inputCat;
        });
    });

    _.forEach(resourcesToRemoveList, function(rObj) {
        var rmResUrl = packageUrlBase + "resource/" + System.getObjectId(rObj);
        executeRestCall(rmResUrl, "DELETE");
    });
}

System.log("Package '" + packageNameInput + "' creation completed.");

return null;
