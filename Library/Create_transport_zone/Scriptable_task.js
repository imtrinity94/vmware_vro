/**
 * Scriptable task
 *
 * @param {VAPI:VAPIEndpoint} endpoint
 */
var client = endpoint.client("admin", "ca$hc0w");
try {
  var tzService = new com_vmware_nsx_transport__zones__service(client);

  var tz = new com_vmware_nsx_data_transport__zone_transport__zone();
  tz.display_name = "tzSample5";
  tz.description = "Sample Transport Zone 2";
  tz.host_switch_name = "opaque-switch-1";
  tz.transport_type = com_vmware_nsx_data_switching_transport__type.OVERLAY;

  var result = tzService.create(tz);

  System.log("result -> " + result);
} finally {
  client.close();
}
