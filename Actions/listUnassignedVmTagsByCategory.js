/**
 * @description Lists all vCenter tags in a given category that are not currently assigned to
 *              any objects. Uses the vAPI tagging client to query tag associations.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {vAPI:VapiEndpoint} vapiEndpoint - The vAPI endpoint to create the tagging client from.
 * @returns {void} unusedTagsList - Returns an array of tag objects having no object associations.
 */

var vapiClientSession = vapiEndpoint.client();
var categoryCleanupName = "MyCategory";

var taggingService = new com_vmware_cis_tagging_tag(vapiClientSession);
var taggingAssociationService = new com_vmware_cis_tagging_tag__association(vapiClientSession);

var targetCategory = fetchCategoryObjectByName(vapiClientSession, categoryCleanupName);
var unusedTagsList = [];

var categoryTagsUuidList = taggingService.list_tags_for_category(targetCategory.id);

var i;
for (i = 0; i < categoryTagsUuidList.length; i++) {
    var tagUuid = categoryTagsUuidList[i];
    var tagDetails = taggingService.get(tagUuid);
    var attachedObjectsList = taggingAssociationService.list_attached_objects(tagDetails.id);
    
    System.debug("Tag: " + tagDetails.name + " (" + attachedObjectsList.length + " associations)");
    
    if (attachedObjectsList.length === 0) {
        System.log("Found unused tag: " + tagDetails.name);
        unusedTagsList.push(tagDetails);
    }
}

vapiClientSession.close();

return unusedTagsList;

/**
 * Retrieves a tag category by its display name.
 */
function fetchCategoryObjectByName(apiClient, nameToFind) {
    var categoryService = new com_vmware_cis_tagging_category(apiClient);
    var categoryUuidsList = categoryService.list();

    var matchedCategory = null;
    var j;
    for (j = 0; j < categoryUuidsList.length; j++) {
        var catUuid = categoryUuidsList[j];
        var catObj = categoryService.get(catUuid);
        if (catObj.name == nameToFind) {
            matchedCategory = catObj;
            break;
        }
    }
    
    if (!matchedCategory) {
        throw "Tag Category '" + nameToFind + "' does not exist in the vAPI endpoint.";
    }
    
    return matchedCategory;
}
