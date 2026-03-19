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
  var session = new com_vmware_cis_session(client);
  var result = session.get();

  System.log("Result: " + result);
  System.log("Created on: " + result.created_time);
} finally {
  client.close();
}
