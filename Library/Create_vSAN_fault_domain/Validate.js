/**
 * Validate
 *
 * @param {string} faultDomainName
 * @param {VC:ClusterComputeResource} cluster
 */
var isEnabled = System.getModule("com.vmware.library.vsan.cluster.configuration").isVsanEnabledCluster(cluster);
if (!isEnabled) {
   throw "VsanConfigError: This cluster is not vSAN enabled";
}

// Validate that no fault domain with the same name exists in cluster
var fdNames = System.getModule("com.vmware.library.vsan.cluster.faultdomain").getAllVsanFaultDomainsOfCluster(cluster);
if (fdNames.some(function (item) {return item === faultDomainName})) {
   throw "Error: Fault domain with name [" + faultDomainName + "] already exists in cluster [" + cluster.name + "]";
}