/**
 * Creates a vRO package containing specified workflows, actions, configurations, and resources.
 * This action uses the vRO REST API to achieve package creation and management.
 * Useful for automated backups or CI/CD pipelines.
 * 
 * Pre-requisite: Use of lodash Library in the same module.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {string} packageNameInput Name of the package to create (e.g., "fr.numaneo.library").
 * @param {string[]} workflowCategoriesListInput List of Workflow Category names.
 * @param {string[]} moduleActionsListInput List of Module names for actions.
 * @param {string[]} configurationCategoriesListInput List of Configuration Category paths.
 * @param {string[]} resourceCategoriesListInput List of Resource Category paths.
 * @returns {void}
 */

// Load Lodash functions
var _ = System.getModule("fr.numaneo.library").lodashLibrary();

// Create REST Host to VRO
var user = null;
var password = null;
var restHost = RESTHostManager.createHost("DynamicRequest");
var vroRestHost = RESTHostManager.createTransientHostFrom(restHost);
vroRestHost.url = "https://localhost:8281";

var authParams = ["Per User Session", user, password];
var authenticationObject = RESTAuthenticationManager.createAuthentication("Basic", authParams);
vroRestHost.authentication = authenticationObject;

var baseUrl = "/vco/api" + "/packages/" + packageNameInput + "/"; // Last "/" is very important

/**
 * Sends a REST request to the vRO API.
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

    System.debug("Status : '" + response.statusCode + "'");

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
    categories.push(category);
    _.forEach(category.subCategories, function(subCategory) {
        retrieveSubCategories(categories, subCategory);
    });
    return categories;
};

// Delete previous existing package
var deleteUrl = baseUrl;
sendRequest(deleteUrl, "DELETE");

// Create new package
var requestUrl = baseUrl;
sendRequest(requestUrl, "PUT");

// Rebuild package
var rebuildUrl = baseUrl + "rebuild";
sendRequest(rebuildUrl, "POST");

/**
 * Adds workflows from a category to the package.
 * @private
 */
var addWorkflows = function(categoryName) {
    var allCategories = _.concat(Server.getAllWorkflowCategories(), Server.getWorkflowCategoryWithPath("Library").subCategories);
    var categoryId = _.find(_.flattenDeep(allCategories), function(category) {
        return category.name === categoryName;
    });
    if (categoryId) {
        var addWokrflowsUrl = baseUrl + "workflow_category/" + System.getObjectId(categoryId);
        sendRequest(addWokrflowsUrl, "POST");
    } else {
        System.warn("Workflow Category not found: " + categoryName);
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
    var addActionsUrl = baseUrl + "action/" + moduleAction.name + "/"; // Last / is IMPORTANT
    sendRequest(addActionsUrl, "POST");
});

// Add configuration elements under configuration category
var allConfigurationCategories = _(configurationCategoriesListInput).map(function(categoryPath) {
    var configurationCategory = Server.getConfigurationElementCategoryWithPath(categoryPath);
    return retrieveSubCategories([], configurationCategory);
}).flatten().value();

_.forEach(allConfigurationCategories, function(configurationCategory) {
    var categoryPath = configurationCategory.path;
    var addConfigUrl = baseUrl + "configuration_category/" + encodeURIComponent(categoryPath.replace("/", ".")) + "/"; // Last / is IMPORTANT
    sendRequest(addConfigUrl, "POST");
});

// Add resource elements under resource category
var allResourceCategories = _(resourceCategoriesListInput).map(function(categoryPath) {
    var resourceCategory = Server.getResourceElementCategoryWithPath(categoryPath);
    return retrieveSubCategories([], resourceCategory);
}).flatten().value();

_.forEach(allResourceCategories, function(resourceCategory) {
    var categoryPath = resourceCategory.path;
    var addResourceUrl = baseUrl + "resource_category/" + encodeURIComponent(categoryPath.replace("/", ".")) + "/"; // Last / is IMPORTANT
    sendRequest(addResourceUrl, "POST");
});

/**
 * Finds the parent folder name for a workflow.
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
    System.warn("Name : " + packageCreated.name);
    System.log("Nb ResourceElements : " + (packageCreated.resourceElements ? packageCreated.resourceElements.length : 0));
    System.log("Nb ConfigurationElements : " + (packageCreated.configurationElements ? packageCreated.configurationElements.length : 0));
    System.log("Nb Workflows : " + (packageCreated.workflows ? packageCreated.workflows.length : 0));
    System.log("Nb Actions : " + (packageCreated.actions ? packageCreated.actions.length : 0));

    // Remove workflows that are automatically imported by VRO but not under workflow categories
    var workflowsToRemove = _.filter(packageCreated.workflows, function(wf) {
        return _.every(workflowCategoriesListInput, function(wfCategory) {
            return parentFolderName(wf.workflowCategory) !== wfCategory;
        });
    });

    System.warn("Remove worfklows : " + _.map(workflowsToRemove, "name"));

    _.forEach(workflowsToRemove, function(wf) {
        var removeUrl = baseUrl + "workflow/" + System.getObjectId(wf);
        sendRequest(removeUrl, "DELETE");
    });

    // Remove actions that are automatically imported by VRO but not under module actions
    var actionsToRemove = _.filter(packageCreated.actions, function(action) {
        return _.every(moduleActionsListInput, function(moduleAction) {
            return action.module.name.indexOf(moduleAction) === -1;
        });
    });

    System.warn("Remove actions : " + _.map(actionsToRemove, "name"));

    _.forEach(actionsToRemove, function(action) {
        var removeUrl = baseUrl + "action/" + System.getObjectId(action);
        sendRequest(removeUrl, "DELETE");
    });

    // Remove Resource Elements that are automatically imported by VRO but not under Resource categories
    var resourcesToRemove = _.filter(packageCreated.resourceElements, function(resource) {
        return _.every(workflowCategoriesListInput, function(wfCategory) {
            return parentFolderName(resource.getResourceElementCategory()) !== wfCategory;
        });
    });

    System.warn("Remove resources : " + _.map(resourcesToRemove, "name"));

    _.forEach(resourcesToRemove, function(resource) {
        var removeUrl = baseUrl + "resource/" + System.getObjectId(resource);
        sendRequest(removeUrl, "DELETE");
    });
}

System.log("Package '" + packageNameInput + "' created");
