/**
 * @description Creates a vRO package containing specified workflows, actions, configuration
 *              elements, and resource elements. Helpful for automated daily exports to
 *              version control systems like Git.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
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
var user = null;
var password = null;
var restHost = RESTHostManager.createHost("DynamicRequest");
var vroRestHost = RESTHostManager.createTransientHostFrom(restHost);
vroRestHost.url = "https://localhost:8281";
var authParams = ["Per User Session", user, password];
var authenticationObject = RESTAuthenticationManager.createAuthentication("Basic", authParams);
vroRestHost.authentication = authenticationObject;

var baseUrl = "/vco/api" + "/packages/" + packageNameInput + "/"; // Last "/" is very important, else weird thing, the last part of the name is removed!

/**
 * Sends a REST request to the vRO API.
 * @param {string} url - Target URL.
 * @param {string} method - HTTP method.
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
 * Recursively retrieves sub-categories.
 * @param {Array} categories - Accumulator array.
 * @param {Object} category - Current category object.
 * @returns {Array} - List of all categories.
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
 * Adds workflows under a specific workflow category to the package.
 * @param {string} categoryName - Name of the category.
 */
var addWorkflows = function(categoryName) {
    var allCategories = _.concat(Server.getAllWorkflowCategories(), Server.getWorkflowCategoryWithPath("Library").subCategories);
    var categoryId = _.find(_.flattenDeep(allCategories), function(category) {
        return category.name === categoryName;
    });
    var addWokrflowsUrl = baseUrl + "workflow_category/" + System.getObjectId(categoryId);

    sendRequest(addWokrflowsUrl, "POST");
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
    var addActionsUrl = baseUrl + "configuration_category/" + encodeURIComponent(categoryPath.replace("/", ".")) + "/"; // Last / is IMPORTANT
    sendRequest(addActionsUrl, "POST");
});

// Add resource elements under resource category
var allResourceCategories = _(resourceCategoriesListInput).map(function(categoryPath) {
    var resourceCategory = Server.getResourceElementCategoryWithPath(categoryPath);
    return retrieveSubCategories([], resourceCategory);
}).flatten().value();

_.forEach(allResourceCategories, function(resourceCategory) {
    var categoryPath = resourceCategory.path;
    var addActionsUrl = baseUrl + "resource_category/" + encodeURIComponent(categoryPath.replace("/", ".")) + "/"; // Last / is IMPORTANT
    sendRequest(addActionsUrl, "POST");
});

/**
 * Helper to get the top-level parent folder name of a workflow.
 * @param {Object} wf - Workflow or WorkflowCategory object.
 * @returns {string} - Parent folder name.
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

System.log("Package '" + packageNameInput + "' created");
