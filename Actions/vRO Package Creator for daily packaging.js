/**
 * Creates a vRealize Orchestrator package containing specified workflows, actions, configurations, and resources.
 * This is useful for automated daily exports and version control integration.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} packageNameInput Name of the package to create.
 * @param {string[]} workflowCategoriesListInput List of workflow category paths.
 * @param {string[]} moduleActionsListInput List of action module names.
 * @param {string[]} configurationCategoriesListInput List of configuration element category paths.
 * @param {string[]} resourceCategoriesListInput List of resource element category paths.
 * @returns {void}
 * 
 * @example
 * System.getModule("fr.numaneo.library").createPackage("my.package", ["FOLDER"], ["my.module"], ["Configs"], ["Resources"]);
 */

// Load Lodash functions
var _ = System.getModule("fr.numaneo.library").lodashLibrary();

// Create Transient REST Host for vRO API
var user = null; // Assuming session authentication
var password = null;
var restHost = RESTHostManager.createHost("DynamicRequest");
var vroRestHost = RESTHostManager.createTransientHostFrom(restHost);
vroRestHost.url = "https://localhost:8281";
var authParams = ["Per User Session", user, password];
var authenticationObject = RESTAuthenticationManager.createAuthentication("Basic", authParams);
vroRestHost.authentication = authenticationObject;

var baseUrl = "/vco/api/packages/" + packageNameInput + "/";

/**
 * Internal helper to execute REST requests against vRO.
 * @private
 */
var sendRequest = function(url, method) {
    var postElement = "{}";
    var request = vroRestHost.createRequest(method, url, postElement);
    request.setHeader("accept", "application/json");
    request.setHeader("content-type", "application/json");
    System.debug(method + " " + url);

    var response = request.execute();
    var content = response.contentAsString;

    System.debug("Status: '" + response.statusCode + "'");

    if (!_.includes([200, 201, 202, 204, 409], response.statusCode)) {
        System.error("Request failed for url " + url);
        System.error("Status " + response.statusCode);
        System.error("Content " + content);
    }
};

/**
 * Recursively retrieves subcategories.
 * @private
 */
var retrieveSubCategories = function(categories, category) {
    if (category) {
        categories.push(category);
        _.forEach(category.subCategories, function(subCategory) {
            retrieveSubCategories(categories, subCategory);
        });
    }
    return categories;
};

// Delete previous existing package
sendRequest(baseUrl, "DELETE");

// Create new package
sendRequest(baseUrl, "PUT");

// Rebuild package metadata
sendRequest(baseUrl + "rebuild", "POST");

// Add workflows under workflow category
var addWorkflows = function(categoryName) {
    var allCategories = _.concat(Server.getAllWorkflowCategories(), Server.getWorkflowCategoryWithPath("Library").subCategories);
    var categoryId = _.find(_.flattenDeep(allCategories), function(cat) {
        return cat.name === categoryName;
    });
    if (categoryId) {
        var addWokrflowsUrl = baseUrl + "workflow_category/" + System.getObjectId(categoryId);
        sendRequest(addWokrflowsUrl, "POST");
    }
};

_.forEach(workflowCategoriesListInput, function(wfCategory) {
    addWorkflows(wfCategory);
});

// Add actions under module action
var allModulesAction = _.filter(System.getAllModules(), function(moduleAction) {
    return _.some(moduleActionsListInput, function(moduleActionName) {
        return _.startsWith(moduleAction.name, moduleActionName);
    });
});

_.forEach(allModulesAction, function(moduleAction) {
    var addActionsUrl = baseUrl + "action/" + moduleAction.name + "/";
    sendRequest(addActionsUrl, "POST");
});

// Add configuration elements
var allConfigurationCategories = _(configurationCategoriesListInput).map(function(categoryPath) {
    var configurationCategory = Server.getConfigurationElementCategoryWithPath(categoryPath);
    return retrieveSubCategories([], configurationCategory);
}).flatten().value();

_.forEach(allConfigurationCategories, function(configCat) {
    var categoryPath = configCat.path;
    var addConfigUrl = baseUrl + "configuration_category/" + encodeURIComponent(categoryPath.replace(/\//g, ".")) + "/";
    sendRequest(addConfigUrl, "POST");
});

// Add resource elements
var allResourceCategories = _(resourceCategoriesListInput).map(function(categoryPath) {
    var resourceCategory = Server.getResourceElementCategoryWithPath(categoryPath);
    return retrieveSubCategories([], resourceCategory);
}).flatten().value();

_.forEach(allResourceCategories, function(resourceCat) {
    var categoryPath = resourceCat.path;
    var addResourceUrl = baseUrl + "resource_category/" + encodeURIComponent(categoryPath.replace(/\//g, ".")) + "/";
    sendRequest(addResourceUrl, "POST");
});

/**
 * Returns the name of the top-most parent folder of a workflow.
 * @private
 */
var parentFolderName = function(wf) {
    var wfParent = wf.parent;
    if (!wfParent) {
        return wf.name;
    } else {
        var parent = parentFolderName(wfParent);
        if (!parent || parent === "Library") {
            return wf.name;
        } else {
            return parent;
        }
    }
};

var packageCreated = Server.getPackageWithName(packageNameInput);
if (packageCreated) {
    System.log("Package stats for '" + packageCreated.name + "':");
    System.log(" - ConfigurationElements: " + (packageCreated.configurationElements ? packageCreated.configurationElements.length : 0));
    System.log(" - ResourceElements: " + (packageCreated.resourceElements ? packageCreated.resourceElements.length : 0));
    System.log(" - Workflows: " + (packageCreated.workflows ? packageCreated.workflows.length : 0));
    System.log(" - Actions: " + (packageCreated.actions ? packageCreated.actions.length : 0));

    // Cleanup: Remove elements that were automatically imported but not in requested categories
    var workflowsToRemove = _.filter(packageCreated.workflows, function(wf) {
        return _.every(workflowCategoriesListInput, function(wfCategory) {
            return parentFolderName(wf.workflowCategory) !== wfCategory;
        });
    });

    _.forEach(workflowsToRemove, function(wf) {
        sendRequest(baseUrl + "workflow/" + System.getObjectId(wf), "DELETE");
    });

    var actionsToRemove = _.filter(packageCreated.actions, function(action) {
        return _.every(moduleActionsListInput, function(moduleAction) {
            return action.module.name.indexOf(moduleAction) === -1;
        });
    });

    _.forEach(actionsToRemove, function(action) {
        sendRequest(baseUrl + "action/" + System.getObjectId(action), "DELETE");
    });

    var resourcesToRemove = _.filter(packageCreated.resourceElements, function(resource) {
        return _.every(resourceCategoriesListInput, function(resCategoryPath) {
             var resCategory = Server.getResourceElementCategoryWithPath(resCategoryPath);
             return resource.getResourceElementCategory().path.indexOf(resCategoryPath) === -1;
        });
    });

    _.forEach(resourcesToRemove, function(resource) {
        sendRequest(baseUrl + "resource/" + System.getObjectId(resource), "DELETE");
    });

    System.log("Package '" + packageNameInput + "' successfully refined.");
}
