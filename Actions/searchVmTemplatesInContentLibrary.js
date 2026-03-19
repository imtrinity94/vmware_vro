/**
 * @description Searches for a VM template (OVA/OVF) by name within all available VAPI
 *              endpoints' Content Libraries. Returns the endpoint and library item ID if found.
 * @note JSDoc generated via Antigravity AI IDE and can be reasonably incorrect.
 *
 * @param {string} searchTemplateName - The name of the template to search for.
 * @returns {void} Sets 'resolvedVapiEndpoint' and 'matchedLibraryItemId' if found.
 */

// vRO Global Outputs Mapping (Assuming these are output parameters of the action)
var resolvedVapiEndpoint = null;
var matchedLibraryItemId = null;

var vapiEndpointsList = VAPIManager.getAllEndpoints();
if (!vapiEndpointsList || vapiEndpointsList.length === 0) {
    throw "Fatal: No VAPI endpoints are configured in this environment.";
}

System.log("Initiating Content Library scan for template: " + searchTemplateName);

var i;
for (i = 0; i < vapiEndpointsList.length; i++) {
    var vapiEndpointItem = vapiEndpointsList[i];
    System.log("Iterating Endpoint: " + vapiEndpointItem);
    
    var vapiClientObj = vapiEndpointItem.client();
    var contentLibrarySvc = new com_vmware_content_library(vapiClientObj);
    var librariesIdsList = contentLibrarySvc.list();
    
    System.debug("Discovered " + (librariesIdsList ? librariesIdsList.length : 0) + " libraries on endpoint: " + vapiEndpointItem);

    if (librariesIdsList && librariesIdsList.length >= 1) {
        var libraryItemSvc = new com_vmware_content_library_item(vapiClientObj);
        var libraryItemFindSpec = new com_vmware_content_library_item_find__spec();
        libraryItemFindSpec.name = searchTemplateName;
        
        var findResultsList = libraryItemSvc.find(libraryItemFindSpec);

        if (!Array.isArray(findResultsList) || findResultsList.length === 0) {
            System.debug("Search yielded zero results on endpoint: " + vapiEndpointItem);
        } else {
            var primaryItemId = findResultsList[0];
            var itemMetadataObj = libraryItemSvc.get(primaryItemId);
            
            System.log("--- Template Match Discovered ---");
            System.log("Name: " + searchTemplateName);
            System.log("Item ID: " + primaryItemId);
            System.log("Item Type: " + itemMetadataObj.type);
            System.log("Endpoint: " + vapiEndpointItem);
            
            // Map findings to action result outputs
            resolvedVapiEndpoint = vapiEndpointItem;
            matchedLibraryItemId = primaryItemId;
            
            // Exit early on first match if desired, though here we continue to log other potential matches
            // break; 
        }
    }
    
    // Crucial: Release VAPI client resources
    vapiClientObj.close();
}

if (!matchedLibraryItemId) {
    System.warn("Template Search finalized: No library matches found for '" + searchTemplateName + "'.");
}

return null;
