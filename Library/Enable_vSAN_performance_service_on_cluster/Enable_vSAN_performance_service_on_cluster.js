/**
 * Enable vSAN performance service on cluster
 *
 * @param {VC:ClusterComputeResource} cluster
 * @param {VC:PbmCapabilityProfile} storagePolicy
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

var clusterConfigSystem = vsanConnection.vsanVcClusterConfigSystem;
var clusterMoRef = new VsanManagedObjectReference(cluster.moref.type, cluster.moref.value);
var configSpec = new VsanVimVsanReconfigSpec();
configSpec.modify = true;
configSpec.perfsvcConfig = new VsanVsanPerfsvcConfig();
configSpec.perfsvcConfig.enabled = true;
if (storagePolicy != null) {
	var profileSpec = new VsanVirtualMachineDefinedProfileSpec();
	profileSpec.profileId = storagePolicy.id;
    configSpec.perfsvcConfig.profile = profileSpec;
} else {
    configSpec.perfsvcConfig.profile = new VsanVirtualMachineDefaultProfileSpec();
}

System.debug("Enabling vSAN performance service on cluster: " + cluster.name);
var vsanTask = clusterConfigSystem.vsanClusterReconfig(clusterMoRef, configSpec);
task = System.getModule("com.vmware.library.vsan").getVcTaskById(cluster.sdkConnection, vsanTask.value);