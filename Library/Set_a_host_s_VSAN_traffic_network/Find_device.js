/**
 * Find device
 *
 * @param {VC:HostSystem} host
 * @param {string} network
 * @return {string} device
 */
portgroupLoop:
for (var pg in host.config.network.portgroup) {
	var portgroup = host.config.network.portgroup[pg];
	if (portgroup.spec.name == network) {
		for (var p in portgroup.port) {
			var port = portgroup.port[p];
			if (port.type == "host") {
				var portKey = port.key;
				for (var n in host.config.network.vnic) {
					var vnic = host.config.network.vnic[n];
					if (vnic.port == portKey) {
						device = vnic.device;
						break portgroupLoop;
					}
				}
			}
		}
	}
}
