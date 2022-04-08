// VMware vRealize Orchestrator (vRO) action sample
//
// Returns all Catalog Resource Actions.
// The result can be iterated and filtered to populate entitlements.
// 
// For vRO/vRA 7.0+
//
// Action Inputs:
//  vraHost  - vCACCAFE:VCACHost
//
// Return type: Array/vCACCAFE:CatalogResourceAction

var cc = vraHost.createCatalogClient();
var ros = cc.getCatalogAdminResourceOperationService();

var odataRequest = new vCACCAFEPageOdataRequest(1, 10000);

var actions = ros.findResourceOperations(odataRequest);

return actions;
