/**
 * Retrieves the display name and internal item name of the currently executing
 * workflow item from within the item itself.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {Properties} itemDetailsProperties - Object containing DisplayName and Name.
 */

var workflowItem = System.currentWorkflowItem();
var itemDisplayName = workflowItem.getDisplayName();
var internalItemName = workflowItem.getName();

System.log("Internal Workflow Item Details -> DisplayName: " + itemDisplayName + ", Name: " + internalItemName);

var itemDetailsProperties = new Properties();
itemDetailsProperties.put("DisplayName", itemDisplayName);
itemDetailsProperties.put("Name", internalItemName);

return itemDetailsProperties;
