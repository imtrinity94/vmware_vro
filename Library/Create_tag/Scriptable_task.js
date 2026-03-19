/**
 * Scriptable task
 *
 * @param {VAPI:VAPIEndpoint} endpoint
 * @param {string} description
 * @param {string} name
 * @param {string} categoryId
 */
if (endpoint == null) {
  throw "'endpoint' parameter should not be null";
}
if (categoryId == null) {
  throw "'categoryId' parameter should not be null";
}
if (name == null) {
  throw "'name' parameter should not be null";
}

var client = endpoint.client();
try {
  var tagsvc = new com_vmware_cis_tagging_tag(client);
  var spec = new com_vmware_cis_tagging_tag_create__spec();
  spec.category_id = categoryId;
  spec.description = description;
  spec.name = name;
  var result = tagsvc.create(spec);

  System.log(result);
} finally {
  client.close();
}
