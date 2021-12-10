// VMware vRealize Orchestrator action sample
//
// Assign vCenter tags via VAPI using a single VAPI client to minimize session creation.
// Always creates nonexistent tags, and optionally creates nonexistent tag categories.
// 
// For vRO/VAPI 7.0+
//
// Action Inputs:
// endpoint - VAPIEndpoint - VAPI Endpoint
// vm - VC:VirtualMachine - Virtual machine
// tagNames - Array/string - Names of the tags
// categoryNames - Array/string - Names of the tag categories
// doCreateCategory - boolean - Create tag category if it does not yet exist?
//    If not and category does not exist, throws an error.
// categoryCardinality - string - Optional tag category cardinality if creating nonexistent ones (default is "SINGLE")
// tagDescription - string - Optional description of the tag (default is tag name)
//
// Return type: Array/string - IDs of the tags
 
var tagIds = [];
var vapiClient = endpoint.client();
var tagId;

for (var i = 0; i < tagNames.length; i++) {
  tagId = findOrAddTag(vapiClient, tagNames[i], tagDescription, categoryNames[i], doCreateCategory, categoryCardinality);
  assignTagToVm(vapiClient, vm.id, tagId);
  tagIds.push(tagId);
}
 
 
////////////////////////////////
function findOrAddTag(vapiClient, tagName, tagDescription, categoryName, doCreateCat, catCardinality) {
  var categoryId = getIdOfTagCategory(vapiClient, categoryName);
  if (!isSet(categoryId)) { // Create tag category if it doesn't exist
    if (doCreateCat) {
      if (isSet(catCardinality)) {
        categoryId = createTagCategory(vapiClient,categoryName,categoryName,catCardinality,null);
      } else {
        categoryId = createTagCategory(vapiClient,categoryName,categoryName,"SINGLE",null);
      }
    } else {
      throw "Category '" + categoryName + "' does not exist and will not be created.";
    }
  }

  tagId = getIdOfTag(vapiClient, categoryId, tagName);
  if (!isSet(tagId)) { // Create tag if it does not yet exist
    tagId = createTag(vapiClient,tagName,categoryId,tagDescription);
  }

  return tagId;
}
 
function getIdOfTagCategory(client, name) {
  var catService = new com_vmware_cis_tagging_category(client);
  var categories = catService.list();
  var category;

  for each (var catId in categories) {
    category = catService.get(catId);
    if (category.name == name) {
      System.log("Found tag category with name '" + name + "' with ID '"+ catId +"'");
      return category.id;
    }
  }

  System.warn("No tag category found with name '" + categoryName + "'");

  return null;
}
 
function createTagCategory(client,name,description,cardinality,associableTypes) {
  var catService = new com_vmware_cis_tagging_category(client);
  var spec = getCategorySpec(name,description,cardinality,associableTypes);
  var categoryId = catService.create(spec);

  System.warn("Tag category named '" + name + "' created");

  return categoryId;
}
 
function getCategorySpec(name,description,cardinality,associableTypes) {
  var spec = new com_vmware_cis_tagging_category_create__spec();
  
  spec.name = name;
  spec.description = (isSet(description)) ? description : name;
  spec.cardinality = cardinality;
  spec.associable_types = associableTypes;
  
  return spec;
}
 
function getIdOfTag(client, tagCategoryId, tagName) {
  var tagService = new com_vmware_cis_tagging_tag(client);
  var tags = tagService.list_tags_for_category(tagCategoryId);

  for each (var tid in tags) {
    try {
      var tag = tagService.get(tid);
      if (tag.name == tagName) {
        System.log("Found tag with name '" + tagName +"', tag ID '" + tid + "'");
        return tag.id;
      }
    } catch(e) {
      System.error(e); // There is a bug that throws an exception just because a tag lacks a description
    }
  }

  System.warn("No tag found with name '" + tagName + "' in category with ID '"+ tagCategoryId +"'");

  return null;
}
 
function createTag(client,name,categoryId,description) {
  var tagService = new com_vmware_cis_tagging_tag(client);
  var tagCreateSpec = createTagSpec(name,categoryId,description);
  tagId = tagService.create(tagCreateSpec);

  System.warn("Tag named '" + name + "' created");

  return tagId;
}
 
function createTagSpec(name,categoryId,description) {
  var spec = new com_vmware_cis_tagging_tag_create__spec();
  
  spec.category_id = categoryId;
  spec.name = name;
  spec.description = (isSet(description)) ? description : name;
  
  return spec;
}
 
function assignTagToVm(client, vmId, tagId) {
  //Prep VM VAPI reference object
  var vapiVm = new com_vmware_vapi_std_dynamic__ID();
  vapiVm.id = vmId;
  vapiVm.type = "VirtualMachine";

  //Associate VM to tag:
  var assocService = new com_vmware_cis_tagging_tag__association(client);
  assocService.attach(tagId , vapiVm);

  System.log("Tag with ID '" + tagId + "' assigned to VM with ID '" + vmId + "'");
}
 
 
function isSet(s) {
  return s != null && s != "";
}
