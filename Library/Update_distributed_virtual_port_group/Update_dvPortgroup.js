/**
 * Update dvPortgroup
 *
 * @param {VC:DistributedVirtualPortgroup} dvPortgroup
 * @param {string} dvPortgroupName
 * @param {number} numPorts
 * @param {string} portNameFormat
 * @param {string} description
 * @param {string} type
 * @param {boolean} blockAllPorts
 * @param {boolean} portConfigResetAtDisconnect
 * @param {boolean} blockOverrideAllowed
 * @param {boolean} shapingOverrideAllowed
 * @param {boolean} vendorConfigOverrideAllowed
 * @param {boolean} livePortMovingAllowed
 * @param {boolean} vlanOverrideAllowed
 * @param {boolean} uplinkTeamingOverrideAllowed
 * @param {boolean} securityPolicyOverrideAllowed
 * @param {boolean} allowPromiscuous
 * @param {boolean} macChanges
 * @param {boolean} forgedTransmits
 * @param {boolean} ingressShapingEnabled
 * @param {number} ingressShapingAvg
 * @param {number} ingressShapingPeak
 * @param {number} ingressShapingBurst
 * @param {boolean} egressShapingEnabled
 * @param {number} egressShapingAvg
 * @param {number} egressShapingPeak
 * @param {number} egressShapingBurst
 * @param {string} uplinkTeamingPolicy
 * @param {boolean} notifySwitches
 * @param {boolean} networkFailoverDetection
 * @param {boolean} failback
 * @param {Array/string} activeUplinkPortArray
 * @param {Array/string} standbyUplinkPortArray
 * @param {string} vlanType
 * @param {number} vlanID
 * @param {number} privateVlanId
 * @param {string} vlanTrunkRange
 * @return {VC:Task} task
 */
// ------- ReconfigureDVPortgroup_Task -------
// General Settings:
var spec = new VcDVPortgroupConfigSpec();
spec.configVersion = dvPortgroup.config.configVersion; // retrieves configVersion to use during update
spec.name = dvPortgroupName;
spec.numPorts = numPorts; // default value: 128
spec.portNameFormat = portNameFormat; // default value: null
spec.description = description; // default value: null
spec.type = type; // valid values: earlyBinding, lateBinding, ephemeral

// Advanced Settings:
spec.policy = new VcVMwareDVSPortgroupPolicy();
spec.policy.portConfigResetAtDisconnect = portConfigResetAtDisconnect; // default value: true
spec.policy.blockOverrideAllowed = blockOverrideAllowed; // default value: true
spec.policy.shapingOverrideAllowed = shapingOverrideAllowed; // default value: false
spec.policy.vendorConfigOverrideAllowed = vendorConfigOverrideAllowed; // default value: false
spec.policy.livePortMovingAllowed = livePortMovingAllowed; // default value: false
spec.policy.vlanOverrideAllowed = vlanOverrideAllowed; // default value: false
spec.policy.uplinkTeamingOverrideAllowed = uplinkTeamingOverrideAllowed; // default value: false
spec.policy.securityPolicyOverrideAllowed = securityPolicyOverrideAllowed; // default value: false


// Configure Default Port Configuraiton
var defaultPortConfig = new VcVMwareDVSPortSetting();
// Policies - Misc:
defaultPortConfig.blocked = new VcBoolPolicy();
defaultPortConfig.blocked.inherited = false;
defaultPortConfig.blocked.value = blockAllPorts; // Shuts down all ports in the portgroup if set to true

// Security Settings:
var securityPolicy = new VcDVSSecurityPolicy();
securityPolicy.inherited = false;
securityPolicy.allowPromiscuous = new VcBoolPolicy();
securityPolicy.allowPromiscuous.inherited = false;
securityPolicy.allowPromiscuous.value = allowPromiscuous; // default value: false
securityPolicy.macChanges = new VcBoolPolicy();
securityPolicy.macChanges.inherited = false;
securityPolicy.macChanges.value  = macChanges; // default value: true
securityPolicy.forgedTransmits = new VcBoolPolicy();
securityPolicy.forgedTransmits.inherited = false;
securityPolicy.forgedTransmits.value = forgedTransmits; // default value: true
defaultPortConfig.securityPolicy = securityPolicy;

// Ingress Traffic Shaping Policy:
var inShapingPolicy = new VcDVSTrafficShapingPolicy();
inShapingPolicy.inherited = false;
inShapingPolicy.enabled = new VcBoolPolicy();
inShapingPolicy.enabled.inherited = false;
inShapingPolicy.enabled.value = ingressShapingEnabled; // default value = false
inShapingPolicy.averageBandwidth = new VcLongPolicy();
inShapingPolicy.averageBandwidth.inherited = false;
inShapingPolicy.averageBandwidth.value = (ingressShapingAvg * 1000); // default value = 100000000 (bits per sec - so this value/1000 is what is shown as Kbits/sec in vCenter UI)
inShapingPolicy.peakBandwidth = new VcLongPolicy();
inShapingPolicy.peakBandwidth.inherited = false;
inShapingPolicy.peakBandwidth.value = (ingressShapingPeak * 1000); // default value same as averageBandwidth.value
inShapingPolicy.burstSize = new VcLongPolicy();
inShapingPolicy.burstSize.inherited = false;
inShapingPolicy.burstSize.value = (ingressShapingBurst * 1024); // default value = 104857600 (102400 Kbytes as shown in vCenter UI)
// Now apply the Traffic Shaping Policy to the Default Port Configuration
defaultPortConfig.inShapingPolicy = inShapingPolicy;

// Egress Traffic Shaping Policy
var outShapingPolicy = new VcDVSTrafficShapingPolicy();
outShapingPolicy.inherited = false;
outShapingPolicy.enabled = new VcBoolPolicy();
outShapingPolicy.enabled.inherited = false;
outShapingPolicy.enabled.value = egressShapingEnabled; // default value = false
outShapingPolicy.averageBandwidth = new VcLongPolicy();
outShapingPolicy.averageBandwidth.inherited = false;
outShapingPolicy.averageBandwidth.value = (egressShapingAvg * 1000); // default value = 100000000 (bits per sec - so this value/1000 is what is shown as Kbits/sec in vCenter UI)
outShapingPolicy.peakBandwidth = new VcLongPolicy();
outShapingPolicy.peakBandwidth.inherited = false;
outShapingPolicy.peakBandwidth.value = (egressShapingPeak * 1000); // default value same as averageBandwidth.value
outShapingPolicy.burstSize = new VcLongPolicy();
outShapingPolicy.burstSize.inherited = false;
outShapingPolicy.burstSize.value = (egressShapingBurst * 1024); // default value = 104857600 (102400 Kbytes as shown in vCenter UI)
// Now apply the Traffic Shaping Policy to the Default Port Configuration
defaultPortConfig.outShapingPolicy = outShapingPolicy;

defaultPortConfig.vlan = new VcVmwareDistributedVirtualSwitchVlanIdSpec();
switch (vlanType){
	case "None":
		defaultPortConfig.vlan.vlanId = 0; // default value: 0 (0=disabled)
		break;
	case "VLAN":
		defaultPortConfig.vlan.vlanId = vlanID;
		break;
	case "VLAN Trunking":
		// override the defaultPortConfig.vlan object as new version for VLAN Trunking
		defaultPortConfig.vlan = new VcVmwareDistributedVirtualSwitchTrunkVlanSpec();
		// Split the input value by commas
		var vlanArray = vlanTrunkRange.split(",");
		System.log("Processing VLAN Trunking input: "+vlanArray);
		// Create new array to store each of the vlanId objects
		var vlanIdArray = new Array();
		for each (vlan in vlanArray){
			// Create VcNumericRange object to store the range
			var vlanId = new VcNumericRange();
			var startVal = vlan.split("-")[0];
			vlanId.start = startVal;
			var endVal = vlan.split("-")[1];
			if(endVal != null){
				vlanId.end=endVal;
			}else{
				vlanId.end=startVal;
			}
			// Add the range object to the array
			vlanIdArray.push(vlanId);
			System.log("vlanId: "+startVal+"-"+endVal);
		}
		// Assign the array to the configuration value
		defaultPortConfig.vlan.vlanId = vlanIdArray;
		break;
	case "Private VLAN": // requires pVLAN specified on vSwitch
		// override the defaultPortConfig.vlan object as new version for Private VLAN
		defaultPortConfig.vlan = new VcVmwareDistributedVirtualSwitchPvlanSpec();
		defaultPortConfig.vlan.pvlanId = privateVlanId;
		break;
	default:
		defaultPortConfig.vlan.vlanId = 0;
}
defaultPortConfig.vlan.inherited = false;

// Teaming and Failover
var teamingPolicy = new VcVmwareUplinkPortTeamingPolicy();
teamingPolicy.inherited = false;
teamingPolicy.policy = new VcStringPolicy();
teamingPolicy.policy.inherited = false;
teamingPolicy.policy.value = uplinkTeamingPolicy; // default value: loadbalance_srcid // possible values: loadbalance_ip, loadbalance_loadbased, loadbalance_srcid, loadbalance_srcmac

teamingPolicy.notifySwitches = new VcBoolPolicy();
teamingPolicy.notifySwitches.inherited = false;
teamingPolicy.notifySwitches.value = notifySwitches; // default value: true

teamingPolicy.rollingOrder = new VcBoolPolicy();
teamingPolicy.rollingOrder.inherited = false;
teamingPolicy.rollingOrder.value = !failback; // default value: false -- Note: value in vCenter is the opposite of the true/false value here, hence the ! before the variable

teamingPolicy.failureCriteria = new VcDVSFailureCriteria();
teamingPolicy.failureCriteria.inherited = false;

teamingPolicy.failureCriteria.checkBeacon = new VcBoolPolicy();
teamingPolicy.failureCriteria.checkBeacon.inherited = false;
teamingPolicy.failureCriteria.checkBeacon.value = networkFailoverDetection; // default value: false

teamingPolicy.uplinkPortOrder = new VcVMwareUplinkPortOrderPolicy();
teamingPolicy.uplinkPortOrder.inherited = false;

/*****  This section must be coded to address dynamic number of uplink ports and assign as configured by inputs...*/
// Note: To set as Unused, simply do not specify as active or standby
teamingPolicy.uplinkPortOrder.activeUplinkPort = activeUplinkPortArray;
teamingPolicy.uplinkPortOrder.standbyUplinkPort = standbyUplinkPortArray;

defaultPortConfig.uplinkTeamingPolicy = teamingPolicy;

// Now apply the default port configuration to the VcDVPortgroupConfigSpec
spec.defaultPortConfig = defaultPortConfig;

task = dvPortgroup.reconfigureDVPortgroup_Task(spec);



