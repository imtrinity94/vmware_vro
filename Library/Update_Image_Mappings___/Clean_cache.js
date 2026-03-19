/**
 * Simple task with custom script capability.
 *
 * @param {VRA:Host} vraHost
 */
Server.log("\""+System.currentWorkflowItem().getDisplayName()+"\"  script started");

//Only removing image mappings as we have just changed these
var objectId = "getImageProfileMappings_" + vraHost.name;
DynamicTypesManager.removeFromCache(objectId);

Server.log("\""+System.currentWorkflowItem().getDisplayName()+"\"  script completed");