/**
 * Scriptable task
 *
 * @param {VAPI:VAPIEndpoint} endpoint
 */
if (endpoint == null) {
  throw "'endpoint' parameter should not be null";
}

var client = endpoint.client();
try {
  var tagging = new com_vmware_cis_tagging_tag(client);
  var result = tagging.list();

  System.log(result);
} finally {
  client.close();
}
