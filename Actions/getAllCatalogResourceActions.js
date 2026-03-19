/**
 * Retrieves all Catalog Resource Actions from a vRealize Automation host.
 * The result can be iterated and filtered to populate entitlements.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCACCAFE:VCACHost} vcacCafeHost vRealize Automation host object.
 * @returns {vCACCAFE:CatalogResourceAction[]} catalogActionsList - Array of catalog resource actions.
 */

var catalogClient = vcacCafeHost.createCatalogClient();
var resourceOpService = catalogClient.getCatalogAdminResourceOperationService();

// Define a large page request to fetch comprehensive list
var odataPageRequest = new vCACCAFEPageOdataRequest(1, 10000);
var catalogActionsList = resourceOpService.findResourceOperations(odataPageRequest);

System.log("Successfully retrieved " + catalogActionsList.length + " catalog resource actions from vRA host: " + vcacCafeHost.name);

return catalogActionsList;
