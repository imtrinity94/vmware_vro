/**
 * Validate
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {VC:HostSystem} witnessHost
 * @param {string} preferredFaultDomain
 * @return {string} secondaryFaultDomain
 */
var isEnabled = System.getModule("com.vmware.library.vsan.cluster.configuration").isVsanEnabledCluster(cluster);
if (!isEnabled) {
   throw "VsanConfigError: This cluster is not vSAN enabled";
}

var fdNames = System.getModule("com.vmware.library.vsan.cluster.faultdomain").getAllVsanFaultDomainsOfCluster(cluster);
if (fdNames.length != 2) {
   throw "FaultDomainError: Stretched cluster should have only two fault domains";
}
secondaryFaultDomain = fdNames[0] === preferredFaultDomain ? fdNames[1] : fdNames[0];

if (witnessHost.parent && witnessHost.parent.sdkId === cluster.sdkId) {
   throw "WitnessHostError: Witness host should not be part of the target cluster";
}

if (witnessHost.sdkConnection.sdkId != cluster.sdkConnection.sdkId) {
   throw "WitnessHostError: Witness host should be in same vCenter as the target cluster";
}