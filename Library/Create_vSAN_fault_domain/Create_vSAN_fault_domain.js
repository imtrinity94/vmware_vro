/**
 * Create vSAN fault domain
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {string} faultDomainName
 * @param {Array/VC:HostSystem} hosts
 * @return {VC:Task} task
 */
var vsanConnection = System.getModule("com.vmware.library.vsan").getVsanConnectionFromSdkConnection(cluster.sdkConnection);
if (vsanConnection == null) {
   throw "VsanConnectionError: Could not find vSAN connection for SDK connection [" + cluster.sdkConnection.name + "]";
}

var clusterConfigSystem = vsanConnection.vsanVcClusterConfigSystem;
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var configSpec = new VsanVimVsanReconfigSpec();
configSpec.modify = true;
configSpec.faultDomainsSpec = new VsanVimClusterVsanFaultDomainsConfigSpec();
var fdSpec = new VsanVimClusterVsanFaultDomainSpec();
fdSpec.name = faultDomainName;
fdSpec.hosts = hosts.map(function (item) { return new VsanManagedObjectReference(item.moref.type, item.moref.value)});
configSpec.faultDomainsSpec.faultDomains = [fdSpec];

System.debug("Creating fault domain [" + faultDomainName + "] in cluster: " + cluster.name);
var vsanTask = clusterConfigSystem.vsanClusterReconfig(clusterMoRef, configSpec);
task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);