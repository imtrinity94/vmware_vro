/**
 * Simple task with custom script capability.
 *
 * @param {string} contentLibraryName
 * @param {VAPI:VAPIEndpoint} vapiClient
 */
Server.log("\""+System.currentWorkflowItem().getDisplayName()+"\"  script started");
System.log("*** VAPI:VAPIEndpoint "+vapiClient.name+" ***");
if (vapiClient == null) {
    throw "Unable to locate a VAPI endpoint";
}
var client = vapiClient.client();
// Get library that is subscribed and with a specific name
try {
    var libSvc = new com_vmware_content_library(client);
    var findLibSpec = new com_vmware_content_library_find__spec();
    findLibSpec.name = contentLibraryName;
    findLibSpec.type = "SUBSCRIBED";
    var results = libSvc.find(findLibSpec);
    if (!Array.isArray(results) || !results.length) {
        System.log("Library NOT Found - " + findLibSpec.name);
        throw new Error("Content Library " + findLibSpec.name + " was not found");
    }
    var contentLibraryId = results.shift();
    System.log("Library Found - " + findLibSpec.name + ":" + contentLibraryId);
    //get Library object
    var contentLib = libSvc.get(contentLibraryId);
    // If you want to sync the WHOLE library, you can do it now.
    var syncLibraryClient = new com_vmware_content_subscribed__library(client) // Note, has 2 underscores
    try {
        var syncLibrary = syncLibraryClient.sync(contentLibraryId)
        System.log("Sync Library task started. Response should be HTTP 204, so you need to poll the library for state.")
    } catch (e) {
        throw ("Library sync failed : " + e)
    }
} finally {
    client.close();
}

Server.log("\""+System.currentWorkflowItem().getDisplayName()+"\"  script completed");