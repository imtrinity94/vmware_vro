// VMware vRealize Orchestrator action sample
//
// This sample deletes a vCenter Tag Category given its ID
// 
// For vRO/VAPI 7.0+
//
// Action Inputs:
// endpoint - VAPIEndpoint - VAPI Endpoint
// categoryId - string - ID of the vCenter Tag Category
//
// Return type: void

var client = endpoint.client();
var catService = new com_vmware_cis_tagging_category(client);
catService.delete(categoryId);
