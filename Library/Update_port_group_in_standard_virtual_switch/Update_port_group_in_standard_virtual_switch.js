/**
 * Update port group in standard virtual switch
 *
 * @param {boolean} allowPromiscuous
 * @param {number} averageBandwidth
 * @param {number} burstSize
 * @param {boolean} forgedTransmits
 * @param {VC:HostSystem} host
 * @param {boolean} macChanges
 * @param {boolean} nicTeamingFailureCriteriaCheckBeacon
 * @param {boolean} nicTeamingNotifySwitches
 * @param {string} nicTeamingPolicy
 * @param {boolean} nicTeamingReversePolicy
 * @param {boolean} nicTeamingRollingOrder
 * @param {boolean} overwriteNicTeaming
 * @param {boolean} overwriteSecurity
 * @param {boolean} overwriteTrafficShaping
 * @param {number} peakBandwidth
 * @param {string} portgroupName
 * @param {string} portGroupOld
 * @param {number} vlanId
 * @param {string} vSwitchName
 * @param {boolean} trafficShapingEnabled
 * @return {string} updatedPortgroup
 */
var portgrp = new VcHostPortGroupSpec();
portgrp.name = portgroupName;
portgrp.vlanId = vlanId;
portgrp.vswitchName = vSwitchName;
portgrp.policy = new VcHostNetworkPolicy();
portgrp.policy.security = new VcHostNetworkSecurityPolicy();
if ( overwriteSecurity ) {
	portgrp.policy.security.allowPromiscuous = allowPromiscuous;
	portgrp.policy.security.macChanges = macChanges;
	portgrp.policy.security.forgedTransmits = forgedTransmits;
}
portgrp.policy.nicTeaming = new VcHostNicTeamingPolicy();
portgrp.policy.nicTeaming.failureCriteria = new VcHostNicFailureCriteria();
if ( overwriteNicTeaming ) {
	portgrp.policy.nicTeaming.policy = nicTeamingPolicy;
	portgrp.policy.nicTeaming.notifySwitches = nicTeamingNotifySwitches;
	portgrp.policy.nicTeaming.rollingOrder = nicTeamingRollingOrder;
	portgrp.policy.nicTeaming.failureCriteria.checkBeacon = nicTeamingFailureCriteriaCheckBeacon;
    portgrp.policy.nicTeaming.reversePolicy = nicTeamingReversePolicy;
	portgrp.policy.nicTeaming.nicOrder = new VcHostNicOrderPolicy();
}
portgrp.policy.offloadPolicy = new VcHostNetOffloadCapabilities();
//C# client is not setting those commented properties
//if ( overwriteOffloadPolicy ) {
//	portgrp.policy.offloadPolicy.csumOffload = offloadPolicyCsumOffload;
//	portgrp.policy.offloadPolicy.tcpSegmentation = offloadPolicyTcpSegmentation;
//	portgrp.policy.offloadPolicy.zeroCopyXmit = offloadPolicyZeroCopyXmit;
//}
portgrp.policy.shapingPolicy = new VcHostNetworkTrafficShapingPolicy();
if ( overwriteTrafficShaping ) {
	portgrp.policy.shapingPolicy.enabled = trafficShapingEnabled;
	portgrp.policy.shapingPolicy.averageBandwidth = averageBandwidth;
	portgrp.policy.shapingPolicy.peakBandwidth = peakBandwidth;
	portgrp.policy.shapingPolicy.burstSize = burstSize;
}


host.configManager.networkSystem.updatePortGroup(portGroupOld, portgrp);
updatedPortgroup = portgroupName;