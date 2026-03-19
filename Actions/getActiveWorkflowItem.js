/**
 * @description Retrieves the display name and internal name of the currently executing
 *              workflow item from within the item's own scriptable task.
 *              Note: Specifically targeted for vRO 8.x and later runtime behaviors.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

var executionItem = System.currentWorkflowItem();

if (executionItem) {
    var displayNameStr = executionItem.getDisplayName();
    var internalNameStr = executionItem.getName();
    
    System.log("Context: Currently executing workflow item.");
    System.log("Display Name -> " + displayNameStr);
    System.log("Internal Name -> " + internalNameStr);
} else {
    System.warn("Could not retrieve current workflow item context.");
}

return null;
