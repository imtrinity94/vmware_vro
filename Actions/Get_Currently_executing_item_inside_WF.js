/**
 * @description Retrieves the display name and internal name of the currently executing
 *              workflow item from within the item's own scriptable task.
 *              Note: Works in vRO 8.x and later; may not work in earlier versions.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {void}
 */

System.currentWorkflowItem().getDisplayName(); // get "Rename a VM"
System.currentWorkflowItem().getName();         // get the Item0

// Seems to be working in vRO 8.x and not in earlier versions. But still you can try for yourself.
