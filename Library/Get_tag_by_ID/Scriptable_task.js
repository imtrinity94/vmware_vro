/**
 * Scriptable task
 *
 * @param {VAPI:VAPIEndpoint} endpoint
 * @param {string} tagId
 */
if (endpoint == null) {
  throw "'endpoint' parameter should not be null";
}
if (tagId == null) {
  throw "'tagId' parameter should not be null";
}

var client = endpoint.client();
try {
  var tagging = new com_vmware_cis_tagging_tag(client);
  var result = tagging.get(tagId);

  System.log(result);
} finally {
  client.close();
}
