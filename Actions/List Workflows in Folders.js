/**
 * @description Retrieves all vRO workflow categories whose names contain " - " and returns
 *              them as an array. Useful for filtering folders following a specific naming convention.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {WorkflowCategory[]} An array of matching WorkflowCategory objects.
 */

var arrWorkflowCategory = new Array();

var arrAllWorkflowCategory = Server.getAllWorkflowCategories();

for (var i = 0; i < arrAllWorkflowCategory.length; i++) {
    var objWorkflowCategory = arrAllWorkflowCategory[i];

    var strWorkflowCategoryName = objWorkflowCategory.name;

    if (strWorkflowCategoryName.search(" - ") > -1) {
        System.log("Workflow Category Name: " + objWorkflowCategory.name);

        arrWorkflowCategory.push(objWorkflowCategory);
    }
}

return arrWorkflowCategory;
