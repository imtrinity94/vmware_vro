/**
 * Set teaming option
 *
 * @param {VC:DistributedVirtualPortgroup} dvPortgroup
 * @param {Array/string} activeUplinkPortArray
 * @param {Array/string} standbyUplinkPortArray
 * @param {string} uplinkTeamingPolicy
 * @param {string} networkFailoverDetection
 * @param {boolean} notifySwitches
 * @param {boolean} failback
 * @return {VC:Task} reconfigureDVPortgroup_Task
 */
// ------- ReconfigureDVPortgroup_Task -------
// General Settings:
var spec = new VcDVPortgroupConfigSpec();
spec.configVersion = dvPortgroup.config.configVersion; // retrieves configVersion to use during update

// Configure Default Port Configuraiton
var defaultPortConfig = new VcVMwareDVSPortSetting();

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
teamingPolicy.failureCriteria.checkBeacon.value = networkFailoverDetection == "beacon_probing"; // default value: false

teamingPolicy.uplinkPortOrder = new VcVMwareUplinkPortOrderPolicy();
teamingPolicy.uplinkPortOrder.inherited = false;

// Note: To set as Unused, simply do not specify as active or standby
teamingPolicy.uplinkPortOrder.activeUplinkPort = activeUplinkPortArray;
teamingPolicy.uplinkPortOrder.standbyUplinkPort = standbyUplinkPortArray;

defaultPortConfig.uplinkTeamingPolicy = teamingPolicy;

// Now apply the default port configuration to the VcDVPortgroupConfigSpec
spec.defaultPortConfig = defaultPortConfig;

reconfigureDVPortgroup_Task = dvPortgroup.reconfigureDVPortgroup_Task(spec);
