/**
 * Update dvSwitch
 *
 * @param {VC:VmwareDistributedVirtualSwitch} dvSwitch
 * @param {string} dvSwitchName
 * @param {string} dvSwitchDescription
 * @param {string} contactName
 * @param {string} contactOtherDetails
 * @param {number} maximumMTU
 * @param {string} dpOperation
 * @param {boolean} enableDiscoveryProtocol
 * @param {string} dpType
 * @return {VC:Task} task
 */
var spec = new VcVMwareDVSConfigSpec();
spec.configVersion = dvSwitch.config.configVersion;
spec.name = dvSwitchName;
spec.description = dvSwitchDescription;
//spec.uplinkPortPolicy = new VcDVSNameArrayUplinkPortPolicy();
//spec.uplinkPortPolicy.uplinkPortName = uplinkPortNames;
spec.contact = new VcDVSContactInfo();
spec.contact.name = contactName;
spec.contact.contact = contactOtherDetails;
spec.maxMtu = maximumMTU;
spec.linkDiscoveryProtocolConfig = new VcLinkDiscoveryProtocolConfig();
if ( enableDiscoveryProtocol ) {
	spec.linkDiscoveryProtocolConfig = new VcLinkDiscoveryProtocolConfig();
	spec.linkDiscoveryProtocolConfig.protocol = dpType == "Cisco Discovery Protocol" ? "cdp" : "lldp";
	spec.linkDiscoveryProtocolConfig.operation = dpOperation;
} else {
	spec.linkDiscoveryProtocolConfig.protocol = "lldp";
	spec.linkDiscoveryProtocolConfig.operation = "none";
}

// Apply changes:
task = dvSwitch.reconfigureDvs_Task(spec);
