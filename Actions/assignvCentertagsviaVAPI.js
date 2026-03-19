/**
 * Assigns vCenter tags via VAPI using a single VAPI client to minimize session creation.
 * Always creates nonexistent tags, and optionally creates nonexistent tag categories.
 * 
 * Note: JSDoc is generated via Antigravity AI IDE and can be reasonably incorrect.
 * 
 * @author Mayank Goyal
 * @param {VAPI:VAPIEndpoint} endpoint VAPI Endpoint.
 * @param {VC:VirtualMachine} vm Virtual machine to tag.
 * @param {string[]} tagNames Array of tag names to assign.
 * @param {string[]} categoryNames Array of corresponding tag category names.
 * @param {boolean} doCreateCategory Create tag category if it does not yet exist?
 * @param {string} [categoryCardinality] Optional tag category cardinality ("SINGLE" or "MULTIPLE"). Defaults to "SINGLE".
 * @param {string} [tagDescription] Optional description of the tag. Defaults to tag name.
 * @returns {string[]} IDs of the tags assigned.
 */

var tagIds = [];
var vapiClient = endpoint.client();

for (var i = 0; i < tagNames.length; i++) {
    var tagId = findOrAddTag(vapiClient, tagNames[i], tagDescription, categoryNames[i], doCreateCategory, categoryCardinality);
    assignTagToVm(vapiClient, vm.id, tagId);
    tagIds.push(tagId);
}

return tagIds;

/**
 * Finds a tag by name or creates it if it doesn't exist.
 * @private
 */
function findOrAddTag(vapiClient, tagName, tagDescription, categoryName, doCreateCat, catCardinality) {
    var categoryId = getIdOfTagCategory(vapiClient, categoryName);
    if (!isSet(categoryId)) { // Create tag category if it doesn't exist
        if (doCreateCat) {
            if (isSet(catCardinality)) {
                categoryId = createTagCategory(vapiClient, categoryName, categoryName, catCardinality, null);
            } else {
                categoryId = createTagCategory(vapiClient, categoryName, categoryName, "SINGLE", null);
            }
        } else {
            throw "Category '" + categoryName + "' does not exist and will not be created.";
        }
    }

    var tagId = getIdOfTag(vapiClient, categoryId, tagName);
    if (!isSet(tagId)) { // Create tag if it does not yet exist
        tagId = createTag(vapiClient, tagName, categoryId, tagDescription);
    }

    return tagId;
}

/**
 * Retrieves the ID of a tag category by name.
 * @private
 */
function getIdOfTagCategory(client, name) {
    var catService = new com_vmware_cis_tagging_category(client);
    var categories = catService.list();

    for each (var catId in categories) {
        var category = catService.get(catId);
        if (category.name == name) {
            System.log("Found tag category with name '" + name + "' with ID '" + catId + "'");
            return category.id;
        }
    }

    System.warn("No tag category found with name '" + name + "'");
    return null;
}

/**
 * Creates a new tag category.
 * @private
 */
function createTagCategory(client, name, description, cardinality, associableTypes) {
    var catService = new com_vmware_cis_tagging_category(client);
    var spec = getCategorySpec(name, description, cardinality, associableTypes);
    var categoryId = catService.create(spec);

    System.warn("Tag category named '" + name + "' created");
    return categoryId;
}

/**
 * Builds a category specification object.
 * @private
 */
function getCategorySpec(name, description, cardinality, associableTypes) {
    var spec = new com_vmware_cis_tagging_category_create__spec();
    
    spec.name = name;
    spec.description = (isSet(description)) ? description : name;
    spec.cardinality = cardinality;
    spec.associable_types = associableTypes;
    
    return spec;
}

/**
 * Retrieves the ID of a tag by name within a specific category.
 * @private
 */
function getIdOfTag(client, tagCategoryId, tagName) {
    var tagService = new com_vmware_cis_tagging_tag(client);
    var tags = tagService.list_tags_for_category(tagCategoryId);

    for each (var tid in tags) {
        try {
            var tag = tagService.get(tid);
            if (tag.name == tagName) {
                System.log("Found tag with name '" + tagName + "', tag ID '" + tid + "'");
                return tag.id;
            }
        } catch (e) {
            System.error(e); // There is a bug that throws an exception just because a tag lacks a description
        }
    }

    System.warn("No tag found with name '" + tagName + "' in category with ID '" + tagCategoryId + "'");
    return null;
}

/**
 * Creates a new tag.
 * @private
 */
function createTag(client, name, categoryId, description) {
    var tagService = new com_vmware_cis_tagging_tag(client);
    var tagCreateSpec = createTagSpec(name, categoryId, description);
    var tagId = tagService.create(tagCreateSpec);

    System.warn("Tag named '" + name + "' created");
    return tagId;
}

/**
 * Builds a tag specification object.
 * @private
 */
function createTagSpec(name, categoryId, description) {
    var spec = new com_vmware_cis_tagging_tag_create__spec();
    
    spec.category_id = categoryId;
    spec.name = name;
    spec.description = (isSet(description)) ? description : name;
    
    return spec;
}

/**
 * Assigns a tag to a Virtual Machine.
 * @private
 */
function assignTagToVm(client, vmId, tagId) {
    // Prep VM VAPI reference object
    var vapiVm = new com_vmware_vapi_std_dynamic__ID();
    vapiVm.id = vmId;
    vapiVm.type = "VirtualMachine";

    // Associate VM to tag:
    var assocService = new com_vmware_cis_tagging_tag__association(client);
    assocService.attach(tagId, vapiVm);

    System.log("Tag with ID '" + tagId + "' assigned to VM with ID '" + vmId + "'");
}

/**
 * Utility function to check if a string or object is defined.
 * @private
 */
function isSet(s) {
    return s != null && s != "";
}
