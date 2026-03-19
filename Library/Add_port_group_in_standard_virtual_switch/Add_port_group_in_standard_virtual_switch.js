/**
 * Add port group in standard virtual switch
 *
 * @param {string} name
 * @param {number} vlanId
 * @param {VC:HostSystem} host
 * @param {string} portGroupName
 * @param {string} connectionType
 * @param {boolean} useForVmotion
 * @param {boolean} useForFaultTolerance
 * @param {boolean} useForManagementTraffic
 * @param {string} ipAddress
 * @param {string} subnetMask
 * @param {boolean} use_dhcp
 * @param {boolean} ipV6dhcp
 * @param {boolean} ipV6routerAdv
 * @param {boolean} ipV6staticAdr
 * @param {Array/string} ipV6Addresses
 * @param {string} networkType
 * @return {string} networkLabel
 */
var config = new VcHostNetworkConfig();
config.portgroup = [new VcHostPortGroupConfig()];
config.portgroup[0].changeOperation = "add";
config.portgroup[0].spec = new VcHostPortGroupSpec();
config.portgroup[0].spec.name = portGroupName;
config.portgroup[0].spec.vlanId = vlanId;
config.portgroup[0].spec.vswitchName = name;
config.portgroup[0].spec.policy = new VcHostNetworkPolicy();

if ( connectionType == "VMkernel" ) {
	config.vnic = [new VcHostVirtualNicConfig()];
	config.vnic[0].changeOperation = "add";
	config.vnic[0].portgroup = portGroupName;
	
	// default settings for IPv4 
	config.vnic[0].spec = new VcHostVirtualNicSpec();
	config.vnic[0].spec.ip = new VcHostIpConfig();
	config.vnic[0].spec.ip.dhcp = false;
	config.vnic[0].spec.ip.ipAddress = "";
	config.vnic[0].spec.ip.subnetMask = "";

	// default settings for IPv6
	config.vnic[0].spec.ip.ipV6Config = null;

	// configure IPv4
	if (networkType =='IPv4 (default)' || networkType =='IPv4 and IPv6'){
		config.vnic[0].spec.ip.dhcp = use_dhcp;
		if ( !use_dhcp ) {
			config.vnic[0].spec.ip.ipAddress = ipAddress;
			config.vnic[0].spec.ip.subnetMask = subnetMask;
		} else {
	        //set default values anyway
	        config.vnic[0].spec.ip.ipAddress = '0.0.0.0';
	        config.vnic[0].spec.ip.subnetMask = '0.0.0.0';
	    }
	} 
	// configure IPv6
	if (networkType =='IPv6' || networkType =='IPv4 and IPv6') {
		var tmpArray = new Array();
		for (i in ipV6Addresses) {
			index = ipV6Addresses[i].lastIndexOf('/');
		 	ip = ipV6Addresses[i].substring(0, index);
			ipPrefix = ipV6Addresses[i].substring(index + 1);
			tmpArray[i] = new VcHostIpConfigIpV6Address();
			tmpArray[i].origin = "manual";
			tmpArray[i].operation = "add";
			tmpArray[i].ipAddress = ip;
			tmpArray[i].prefixLength = ipPrefix;
		}

        config.vnic[0].spec.ip.ipV6Config = new VcHostIpConfigIpV6AddressConfiguration();
		config.vnic[0].spec.ip.ipV6Config.ipV6Address = tmpArray;
		config.vnic[0].spec.ip.ipV6Config.autoConfigurationEnabled = ipV6routerAdv;
		config.vnic[0].spec.ip.ipV6Config.dhcpV6Enabled = ipV6dhcp;
	}
	
}
System.log("host: " + host);
System.log("host.configManager: " + host.configManager);
System.log("Config: " + config);

//VcHostNetworkConfigResult
var myVcHostNetworkConfigResult = host.configManager.networkSystem.updateNetworkConfig(config, "modify"); // HostNetworkSystem
System.log("result: " + myVcHostNetworkConfigResult);
if ( connectionType == "VMkernel" ) {
	var device = myVcHostNetworkConfigResult.vnicDevice[0];
	System.log("device: " + device);
	if ( useForVmotion ) {
		host.configManager.virtualNicManager.selectVnicForNicType("vmotion", device);  // HostVirtualNicManager
	}
	if ( useForManagementTraffic ) {	
		host.configManager.virtualNicManager.selectVnicForNicType("management", device);  // HostVirtualNicManager
	}
	if ( useForFaultTolerance ) {
		host.configManager.virtualNicManager.selectVnicForNicType("faultToleranceLogging", device);  // HostVirtualNicManager
	}
}
networkLabel = portGroupName;