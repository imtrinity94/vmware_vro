/**
 * Add host to vSAN fault domain
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {string} faultDomainName
 * @param {VC:HostSystem} host
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

// Check if host is already in the given fault domain
var fdHosts = System.getModule("com.vmware.library.vsan.cluster.faultdomain").getAllHostSystemsOfFaultDomain(cluster, faultDomainName);
if (fdHosts.some(function(item) {return host.sdkId === item.sdkId})) {
   System.log("The Host System [" + host.name + "] is already in vSAN fault domain [" + faultDomainName + "]");
} else {
   var clusterConfigSystem = vsanConnection.vsanVcClusterConfigSystem;
   var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
   var configSpec = new VsanVimVsanReconfigSpec();
   configSpec.modify = true;
   configSpec.faultDomainsSpec = new VsanVimClusterVsanFaultDomainsConfigSpec();
   var fdSpec = new VsanVimClusterVsanFaultDomainSpec();
   fdSpec.name = faultDomainName;
   // Add host to fault domain
   fdSpec.hosts = [new VsanManagedObjectReference(host.moref.type, host.moref.value)];
   configSpec.faultDomainsSpec.faultDomains = [fdSpec];

   System.debug("Adding host system [" + host.name + "] to fault domain [" + faultDomainName + "] in cluster: " + cluster.name);
   var vsanTask = clusterConfigSystem.vsanClusterReconfig(clusterMoRef, configSpec);
   task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);
}