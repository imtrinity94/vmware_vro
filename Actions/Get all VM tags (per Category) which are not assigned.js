/**
 * @description Lists all vCenter tags in a given category that are not currently assigned to
 *              any objects. Uses the vAPI tagging client to query tag associations.
 * @note JSDoc generated via Antigravity AI IDE and may be reasonably incorrect.
 *
 * @param {vAPI:VapiEndpoint} endpoint - The vAPI endpoint to create the tagging client from.
 * @returns {void} Populates `unused_tags` array with tag objects having no object associations.
 */

/**
 * Retrieves a tag category by its display name.
 *
 * @param {*} vapi_client - The vAPI client instance.
 * @param {string} categoryName - The name of the category to find.
 * @returns {*} The category object.
 * @throws {string} If the category does not exist.
 */
function getCategoryByName(vapi_client, categoryName) {
    var tagging_category = new com_vmware_cis_tagging_category(vapi_client);
    var result = tagging_category.list();

    var category = null;
    for each (var c in result) {
        var cat = tagging_category.get(c);
        if (cat.name == categoryName) {
            category = cat;
            break;
        }
    }
    if (category == null) throw "Category doesn't exists";
    return category;
}

var vapi_client = endpoint.client();
var categoryNameForCleanUp = "MyCategory";

var tagging_tag = new com_vmware_cis_tagging_tag(vapi_client);
var tagging_tag_associations = new com_vmware_cis_tagging_tag__association(vapi_client);
var category = getCategoryByName(vapi_client, categoryNameForCleanUp);

var unused_tags = [];
for each (var t in tagging_tag.list_tags_for_category(category.id)) {
    var tag = tagging_tag.get(t);
    var objects = tagging_tag_associations.list_attached_objects(tag.id);
    System.log(tag.name + ". Objects: " + objects.length);
    if (objects.length == 0) {
        unused_tags.push(tag);
    }
}

// Do something with the array 'unused_tags'
vapi_client.close();