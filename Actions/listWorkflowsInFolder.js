/**
 * @description Retrieves all vRO workflow categories whose names contain " - " and returns
 *              them as an array. Useful for filtering folders following a specific naming convention.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {WorkflowCategory[]} filteredCategoriesList - An array of matching WorkflowCategory objects.
 */

var filteredCategoriesList = [];
var allSystemCategories = Server.getAllWorkflowCategories();

System.log("Scanning " + allSystemCategories.length + " workflow categories for target pattern ' - '");

var i;
for (i = 0; i < allSystemCategories.length; i++) {
    var currentCategory = allSystemCategories[i];
    var categoryNameStr = currentCategory.name;

    if (categoryNameStr.indexOf(" - ") !== -1) {
        System.debug("Matched Category Path: " + currentCategory.path);
        filteredCategoriesList.push(currentCategory);
    }
}

System.log("Found " + filteredCategoriesList.length + " categories matching the naming convention.");

return filteredCategoriesList;
