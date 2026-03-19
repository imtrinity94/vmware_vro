/**
 * Deletes a vCenter Tag Category given its ID.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VAPI:VAPIEndpoint} endpoint VAPI Endpoint.
 * @param {string} categoryUuid ID of the vCenter Tag Category.
 * @returns {void}
 */

var vapiClient = endpoint.client();
var taggingCategoryService = new com_vmware_cis_tagging_category(vapiClient);

try {
    taggingCategoryService.delete(categoryUuid);
    System.log("Successfully deleted tag category with ID: " + categoryUuid);
} catch (e) {
    System.error("Failed to delete tag category " + categoryUuid + ": " + e);
}

return null;
