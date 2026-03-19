/**
 * @description Lists all items across all Content Libraries accessible through all VAPI endpoints.
 *              Returns an array of Content Library item model objects.
 *
 * @note No inputs required.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @returns {VAPI:com_vmware_content_library_item__model[]} consolidatedLibraryItemsList - Array of library item models.
 */

var vapiEndpointsList = VAPIManager.getAllEndpoints();

if (!vapiEndpointsList || vapiEndpointsList.length === 0) {
    throw "No active VAPI endpoints found in the environment.";
}

var consolidatedLibraryItemsList = [];

var i;
for (i = 0; i < vapiEndpointsList.length; i++) {
    var endpointObj = vapiEndpointsList[i];
    System.log("Interrogating VAPI Endpoint: " + endpointObj);
    
    var vapiClientSession = endpointObj.client();
    var contentLibrarySvc = new com_vmware_content_library(vapiClientSession);
    var librariesUuidList = contentLibrarySvc.list();
    
    System.log("Found " + librariesUuidList.length + " content libraries on endpoint: " + endpointObj);

    if (librariesUuidList.length > 0) {
        var libraryItemSvc = new com_vmware_content_library_item(vapiClientSession);

        var j;
        for (j = 0; j < librariesUuidList.length; j++) {
            var libraryUuid = librariesUuidList[j];
            var itemsUuidList = libraryItemSvc.list(libraryUuid);
            
            System.debug("Processing Library ID: " + libraryUuid + " (Items: " + itemsUuidList.length + ")");

            var k;
            for (k = 0; k < itemsUuidList.length; k++) {
                var itemUuid = itemsUuidList[k];
                var itemModel = libraryItemSvc.get(itemUuid);
                System.debug("Discovered Content Library Item: " + itemModel.name);
                consolidatedLibraryItemsList.push(itemModel);
            }
        }
    }
    
    // Explicitly close the VAPI client session
    vapiClientSession.close();
}

System.log("Total Content Library items discovered: " + consolidatedLibraryItemsList.length);

return consolidatedLibraryItemsList;
