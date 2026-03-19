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
  var service = new com_vmware_vapi_metadata_metamodel_service(client);
  var result = service.list();

  System.log(result);
} finally {
  client.close();
}
