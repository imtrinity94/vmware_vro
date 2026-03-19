/**
 * Deletes a vCenter Tag Category given its ID.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VAPI:VAPIEndpoint} endpoint VAPI Endpoint.
 * @param {string} categoryId ID of the vCenter Tag Category.
 * @returns {void}
 */

var client = endpoint.client();
var catService = new com_vmware_cis_tagging_category(client);
catService.delete(categoryId);
