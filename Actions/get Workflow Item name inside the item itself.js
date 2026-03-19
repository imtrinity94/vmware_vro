/**
 * Retrieves the display name and internal item name of the currently executing
 * workflow item from within the item itself.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @returns {Properties} Object containing DisplayName and Name.
 */

var currentItem = System.currentWorkflowItem();
var displayName = currentItem.getDisplayName();
var name = currentItem.getName();

System.log("Display Name: " + displayName);
System.log("Item Name: " + name);

var result = new Properties();
result.put("DisplayName", displayName);
result.put("Name", name);

return result;
