/**
 * Remove port group from standard virtual switch
 *
 * @param {VC:HostSystem} host
 * @param {string} portgroupName
 */
for each (vnic in host.configManager.networkSystem.networkInfo.vnic) {
	System.log("Checking vnic [key: " + vnic.key + "; device: " + vnic.device + "]");
	if ( vnic.portgroup == portgroupName ) {
		System.log("Removing device: "  + vnic.device);
		host.configManager.networkSystem.removeVirtualNic(vnic.device);
	}
}
host.configManager.networkSystem.removePortGroup(portgroupName);
System.log("Portgroup: " + portgroupName + " is removed");