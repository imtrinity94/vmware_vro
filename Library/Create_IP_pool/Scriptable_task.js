/**
 * Scriptable task
 *
 * @param {VAPI:VAPIEndpoint} endpoint
 */
var client = endpoint.client("admin", "ca$hc0w");
try {
  var ippService = new com_vmware_nsx_pools_ip__pools__service(client);

  var range = new com_vmware_nsx_data_ipam_ip__pool__range();
  range.start = "192.168.150.100";
  range.end = "192.168.150.200";

  var subnet = new com_vmware_nsx_data_ipam_ip__pool__subnet();
  subnet.cidr = "192.168.150.0/24";
  subnet.gateway_ip = "192.168.150.2";
  subnet.dns_nameservers = ["192.168.110.10"];
  subnet.allocation_ranges = [range];

  var ip_pool = new com_vmware_nsx_data_ipam_ip__pool();
  ip_pool.display_name = "ip-pool-1";
  ip_pool.description = "IP Pool 1";
  ip_pool.subnets = [subnet];

  var result = ippService.create(ip_pool);

  System.log("result -> " + result);
} finally {
  client.close();
}
