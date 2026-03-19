/**
 * Retrieves all Catalog Resource Actions from a vRealize Automation host.
 * The result can be iterated and filtered to populate entitlements.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {vCACCAFE:VCACHost} vraHost vRealize Automation host object.
 * @returns {vCACCAFE:CatalogResourceAction[]} Array of catalog resource actions.
 */

var cc = vraHost.createCatalogClient();
var ros = cc.getCatalogAdminResourceOperationService();

var odataRequest = new vCACCAFEPageOdataRequest(1, 10000);
var actions = ros.findResourceOperations(odataRequest);

return actions;
