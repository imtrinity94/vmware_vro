/**
 * Delete standard virtual switch
 *
 * @param {string} vSwitchName
 * @param {VC:HostSystem} host
 */
function getVnicDevice(portgroupName) {
	for each (vnic in host.configManager.networkSystem.networkInfo.vnic) {
		System.log("Checking vnic [key: " + vnic.key + "; device: " + vnic.device + "]");
		if ( vnic.portgroup == portgroupName ) {
			return vnic.device;
		}
	}
	return null;
}

var config_portgroup = new Array();
var config_vnic = new Array();
for each (portgroup in host.configManager.networkSystem.networkInfo.portgroup) {
	if ( portgroup.spec.vswitchName == vSwitchName ) {
		portgroupConfig = new VcHostPortGroupConfig();
		portgroupConfig.changeOperation = "remove";
		portgroupConfig.spec = new VcHostPortGroupSpec();
		portgroupConfig.spec.name = portgroup.spec.name;
		portgroupConfig.spec.vlanId = portgroup.spec.vlanId;
		portgroupConfig.spec.vswitchName = portgroup.spec.vswitchName;
		portgroupConfig.spec.policy = new VcHostNetworkPolicy();
		config_portgroup.push(portgroupConfig);
		var vnicDevice = getVnicDevice(portgroup.spec.name);
		if ( vnicDevice != null ) {
			var vnicConfig = new VcHostVirtualNicConfig();
			vnicConfig.changeOperation = "remove";
			vnicConfig.device = vnicDevice;
			vnicConfig.portgroup = portgroup.spec.name;
			config_vnic.push(vnicConfig);
		}
	}
}
var config = new VcHostNetworkConfig();
config.portgroup = config_portgroup;
config.vnic = config_vnic;
host.configManager.networkSystem.updateNetworkConfig(config, "modify");  // HostNetworkSystem

host.configManager.networkSystem.removeVirtualSwitch(vSwitchName);  // HostNetworkSystem