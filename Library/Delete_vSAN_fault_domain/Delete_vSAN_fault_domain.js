/**
 * Delete vSAN fault domain
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {string} faultDomainName
 * @return {VC:Task} task
 */
var isEnabled = System.getModule("com.vmware.library.vsan.cluster.configuration").isVsanEnabledCluster(cluster);
if (!isEnabled) {
   throw "VsanConfigError: This cluster is not vSAN enabled";
}

var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);
if (vsanConnection == null) {
   throw "VsanConnectionError: Could not find vSAN connection for SDK connection [" + cluster.sdkConnection.name + "]";
}

var hosts = System.getModule("com.vmware.library.vsan.cluster.faultdomain").getAllHostSystemsOfFaultDomain(cluster, faultDomainName);
var clusterConfigSystem = vsanConnection.vsanVcClusterConfigSystem;
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var configSpec = new VsanVimVsanReconfigSpec();
configSpec.modify = true;
configSpec.faultDomainsSpec = new VsanVimClusterVsanFaultDomainsConfigSpec();
var fdSpec = new VsanVimClusterVsanFaultDomainSpec();
fdSpec.name = "";
fdSpec.hosts = hosts.map(function (item) { return new VsanManagedObjectReference(item.moref.type, item.moref.value)});
configSpec.faultDomainsSpec.faultDomains = [fdSpec];

System.debug("Deleting fault domain [" + faultDomainName + "] in cluster: " + cluster.name);
var vsanTask = clusterConfigSystem.vsanClusterReconfig(clusterMoRef, configSpec);
task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);