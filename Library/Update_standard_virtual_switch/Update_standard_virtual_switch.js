/**
 * Update standard virtual switch
 *
 * @param {VC:HostSystem} host
 * @param {string} vSwitchName
 * @param {number} numPorts
 * @param {number} mtu
 * @param {boolean} allowPromiscuous
 * @param {boolean} macChanges
 * @param {boolean} forgedTransmits
 * @param {boolean} trafficShapingEnabled
 * @param {number} averageBandwidth
 * @param {number} peakBandwidth
 * @param {number} burstSize
 * @param {string} nicTeamingPolicy
 * @param {boolean} nicTeamingReversePolicy
 * @param {boolean} nicTeamingNotifySwitches
 * @param {boolean} nicTeamingRollingOrder
 * @param {string} nicTeamingFailureCriteriaCheckSpeed
 * @param {number} nicTeamingFailureCriteriaSpeed
 * @param {boolean} nicTeamingFailureCriteriaCheckDuplex
 * @param {boolean} nicTeamingFailureCriteriaFullDuplex
 * @param {boolean} nicTeamingFailureCriteriaCheckErrorPercent
 * @param {boolean} nicTeamingFailureCriteriaCheckBeacon
 * @param {number} nicTeamingFailureCriteriaPercentage
 * @param {boolean} offloadPolicyCsumOffload
 * @param {boolean} offloadPolicyTcpSegmentation
 * @param {boolean} offloadPolicyZeroCopyXmit
 * @return {string} updatedVSwitch
 */
var spec = new VcHostVirtualSwitchSpec();
spec.numPorts = numPorts;
spec.policy = new VcHostNetworkPolicy();
spec.policy.security = new VcHostNetworkSecurityPolicy();
spec.policy.security.allowPromiscuous = allowPromiscuous;
spec.policy.security.macChanges = macChanges;
spec.policy.security.forgedTransmits = forgedTransmits;
spec.policy.nicTeaming = new VcHostNicTeamingPolicy();
spec.policy.nicTeaming.policy = nicTeamingPolicy;
spec.policy.nicTeaming.reversePolicy = nicTeamingReversePolicy;
spec.policy.nicTeaming.notifySwitches = nicTeamingNotifySwitches;
spec.policy.nicTeaming.rollingOrder = nicTeamingRollingOrder;
spec.policy.nicTeaming.failureCriteria = new VcHostNicFailureCriteria();
spec.policy.nicTeaming.failureCriteria.checkSpeed = nicTeamingFailureCriteriaCheckSpeed;
spec.policy.nicTeaming.failureCriteria.speed = nicTeamingFailureCriteriaSpeed;
spec.policy.nicTeaming.failureCriteria.checkDuplex = nicTeamingFailureCriteriaCheckDuplex;
spec.policy.nicTeaming.failureCriteria.fullDuplex = nicTeamingFailureCriteriaFullDuplex;
spec.policy.nicTeaming.failureCriteria.checkErrorPercent = nicTeamingFailureCriteriaCheckErrorPercent;
spec.policy.nicTeaming.failureCriteria.percentage = nicTeamingFailureCriteriaPercentage;
spec.policy.nicTeaming.failureCriteria.checkBeacon = nicTeamingFailureCriteriaCheckBeacon;
spec.policy.nicTeaming.nicOrder = new VcHostNicOrderPolicy();
spec.policy.offloadPolicy = new VcHostNetOffloadCapabilities();
spec.policy.offloadPolicy.csumOffload = offloadPolicyCsumOffload;
spec.policy.offloadPolicy.tcpSegmentation = offloadPolicyTcpSegmentation;
spec.policy.offloadPolicy.zeroCopyXmit = offloadPolicyZeroCopyXmit;
spec.policy.shapingPolicy = new VcHostNetworkTrafficShapingPolicy();
spec.policy.shapingPolicy.enabled = trafficShapingEnabled;
spec.policy.shapingPolicy.averageBandwidth = averageBandwidth;
spec.policy.shapingPolicy.peakBandwidth = peakBandwidth;
spec.policy.shapingPolicy.burstSize = burstSize;
spec.mtu = mtu;

var myVcHostNetworkConfigResult = host.configManager.networkSystem.updateVirtualSwitch(vSwitchName, spec); // HostNetworkSystem

updatedVSwitch = vSwitchName;