/**
 * Scriptable task
 *
 * @param {VAPI:VAPIEndpoint} endpoint
 */
if (endpoint == null) {
  throw "'endpoint' parameter should not be null";
}

VAPIManager.removeEndpoint(endpoint.endpointUrl);

