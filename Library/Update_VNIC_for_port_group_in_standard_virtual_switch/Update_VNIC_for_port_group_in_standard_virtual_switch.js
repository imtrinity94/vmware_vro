/**
 * Update VNIC for port group in standard virtual switch
 *
 * @param {boolean} faultToleranceLogging
 * @param {VC:HostSystem} host
 * @param {string} ipAddress
 * @param {boolean} managementTraffic
 * @param {number} mtu
 * @param {string} portgroupName
 * @param {string} portGroupOld
 * @param {string} subnetMask
 * @param {boolean} trafficShapingEnabled
 * @param {boolean} use_dhcp
 * @param {boolean} vMotionEnabled
 * @param {string} vSwitchName
 * @param {boolean} configIPv6
 * @param {boolean} ipV6dhcp
 * @param {boolean} ipV6routerAdv
 * @param {boolean} ipV6staticAdr
 * @param {Array/string} ipV6Addresses
 * @return {string} updatedVnic
 */
var found = false;
for each (vnic in host.configManager.networkSystem.networkInfo.vnic) {
	System.log("Checking vnic [key: " + vnic.key + "; device: " + vnic.device + "]");
	if ( vnic.portgroup == portgroupName ) {
		updatedVnic = vnic.device;
		System.log("Setting up vnic: " + updatedVnic);
		var nic = new VcHostVirtualNicSpec();
		nic.ip = new VcHostIpConfig();
		// IPv4 config
		nic.ip.dhcp = use_dhcp;
		if ( !use_dhcp ) {
			nic.ip.ipAddress = ipAddress;
			nic.ip.subnetMask = subnetMask;
		}
	
		// the user has selected to add a IPv6 config
		if (configIPv6) {
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
			
			nic.ip.ipV6Config = new VcHostIpConfigIpV6AddressConfiguration();
			nic.ip.ipV6Config.ipV6Address = tmpArray;
			nic.ip.ipV6Config.autoConfigurationEnabled = ipV6routerAdv;
			nic.ip.ipV6Config.dhcpV6Enabled = ipV6dhcp;
		}
		
		nic.mac = vnic.spec.mac;
		nic.portgroup = portgroupName;
		nic.mtu = mtu;
		nic.tsoEnabled = vnic.spec.tsoEnabled;
		System.log("Updating the vnic: " + updatedVnic);
		host.configManager.networkSystem.updateVirtualNic(updatedVnic, nic);  // HostNetworkSystem
		System.log("Nic updated: " + updatedVnic);
		if ( faultToleranceLogging ) {
			host.configManager.virtualNicManager.selectVnicForNicType("faultToleranceLogging", updatedVnic);  // HostVirtualNicManager
		} else {
			var netConfig =  host.configManager.virtualNicManager.queryNetConfig("faultToleranceLogging");
			System.log("netConfig[faultToleranceLogging]: " + netConfig);
			for each (device in netConfig.selectedVnic) {
				System.log("netConfig[faultToleranceLogging] device: " + device);
				if ( device == "faultToleranceLogging.key-vim.host.VirtualNic-" + updatedVnic ) {
					System.log("Deselecting vNIC for faultToleranceLogging");
					host.configManager.virtualNicManager.deselectVnicForNicType("faultToleranceLogging", updatedVnic);  // HostVirtualNicManager
					break;
				}
			}
		}
		if ( vMotionEnabled ) {
			host.configManager.virtualNicManager.selectVnicForNicType("vmotion", updatedVnic);  // HostVirtualNicManager
		} else {
			var netConfig =  host.configManager.virtualNicManager.queryNetConfig("vmotion");
			System.log("netConfig[vmotion]: " + netConfig);
			for each (device in netConfig.selectedVnic) {
				System.log("netConfig[faultToleranceLogging] device: " + device);
				if ( device == "vmotion.key-vim.host.VirtualNic-"+updatedVnic ) {
					System.log("Deselecting vNIC for vmotion");
					host.configManager.virtualNicManager.deselectVnicForNicType("vmotion", updatedVnic);  // HostVirtualNicManager
					break;
				}
			}
		}
		if ( managementTraffic ) {
			host.configManager.virtualNicManager.selectVnicForNicType("management", updatedVnic); // HostVirtualNicManager
		} else {
			var netConfig =  host.configManager.virtualNicManager.queryNetConfig("management");
			System.log("netConfig[management]: " + netConfig);
			for each (device in netConfig.selectedVnic) {
				System.log("netConfig[faultToleranceLogging] device: " + device);
				if ( device == "management.key-vim.host.VirtualNic-"+updatedVnic ) {
					System.log("Deselecting vNIC for management");
					host.configManager.virtualNicManager.deselectVnicForNicType("management", updatedVnic);  // HostVirtualNicManager
					break;
				}
			}		
		}
		found = true;
		break;
	}
}

if (!found) {
	throw "No portgroup with the specified name found on this host"
}